---
title: 单输入线性回归模型
sidebar-label: 单输入线性回归模型
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 监督学习算法的流程
根据训练集，利用监督学习算法，得到一个最为拟合训练集数据的模型，然后根据模型来预测数据。

那么，现在将问题简化，假设我们要的模型是线性模型，那么我们主要思考的问题就是：
1. 线性模型是什么
2. 如何判断这个线性模型是否拟合
3. 如何让线性模型变得拟合

## 线性模型
线性模型顾名思义就是一根直线，在二维平面上的数学公式：
$$
f(x) = wx + b
$$
在多维空间中则是
$$
f(x) = w_1x + w_2x + ... + w_nx + b
$$
从公式可以看出，线性模型由参数$w_1, w_2, ... , w_n$来控制。因此，我们在寻找拟合曲线的过程主要就是寻找拟合曲线的参数值

## 代价函数
这个函数回答了上面的第二个问题，我们可以利用代价函数来判断当前的线性模型是否拟合。

在线性模型中，我们主要利用的代价函数是**均方误差函数**，以一个输入的线性回归模型为例，公式是
$$
J(w,b) = \frac{1}{2m}\sum_{1}^{m}(f(x^{(i)}) - y^{(i)})^2
$$
从公式可以看出，代价函数(cost function)是参数 w, b 的函数

可以分为两部分理解：
1. $(f(x^{(i)}) - y^{(i)})^2$ 对每个$x^{(i)}$预测值与实际输出的差距，为了只显示差距大小，将差距平方得到正数
2. 先将差距求和后求均值，是为了让这个模型与训练集的差距不随训练集的规模的扩大而扩大

根据上面的公式计算出来的就是所谓的“代价”，这个代价越大，说明模型越不拟合，代价越小，说明模型越拟合

## 梯度下降法
这个方法回答了第三个问题，当我们初始假设的模型并不拟合的时候，我们该如何调整，最终让模型能够达到最为拟合的效果

让模型最为拟合，换个角度讲，就是代价最小，那么我们的目标其实就是$minimize J(w,b)$，为了实现一步步接近$J(w, b)$的最小值，我们需要用到梯度下降法：
$$
w = w - \alpha\frac{\partial J(w, b)}{\partial w}
$$
$$
b = b - \alpha\frac{\partial J(w, b)}{\partial b}
$$

根据代价函数的公式，我们可以进一步得到
$$
w = w - \frac{\alpha}{m}\sum_1^m(wx^{(i)} + b - y^{(i)})x^{(i)}
$$
$$
b = b - \frac{\alpha}{m}\sum_1^m(wx^{(i)} + b - y^{(i)})
$$

公式中的内容可以这么理解

一个人位于某一个点上，现在他想以最短的距离移动到最低点 (local minima) 
1. $\alpha$指定的是每一次移动的步伐大小
2. $\frac{\partial J(w,b)}{\partial b}$ 指的是每一次移动的方向

![gradient descent](https://bear-img-1319754387.cos.ap-guangzhou.myqcloud.com/website/machine%20learning/gradient%20descent.png)

## 代码

<Tabs>
  <TabItem value="cost function" label="代价函数" default>

```python
# 计算代价
def compute_cost(x, y, w, b):
    total_cost = 0
    m = len(x)
    for i in range(m):
        f_xi = w * x[i] + b
        total_cost += (f_xi - y[i]) ** 2
    total_cost = total_cost / (2 * m)
    return total_cost
```
  </TabItem>
  <TabItem value="求导数" label="求导数">

```python
def compute_derivative(x, y, w, b):
    m = len(x)
    dj_dw = 0
    dj_db = 0
    for i in range(m):
        error = w * x[i] + b - y[i]
        dj_dw += error * x[i]
        dj_db += error
    return dj_dw, dj_db
```

  </TabItem>
  <TabItem value="梯度下降" label="梯度下降">

```python
def gradient_descent(x, y, w_in, b_in, iter_nums, alpha, cost_function, gradient_function):
    w = w_in
    b = b_in
    # 根据iter_nums控制循环次数，因为不是每个训练集都有偏导为零的点
    # 就算有，也可能次数太大，而在一定次数之后，代价的下降幅度已经很小了
    # 再往后计算，不仅浪费资源，而且计算得到的参数与之前的差距也很小
    for i in range(iter_nums):
        cost = cost_function(x, y, w, b)
        if cost == 0:
            return w, b
        elif i > 100000:  # 防止资源浪费
            return w, b
        else:
            dj_dw, dj_db = gradient_function(x, y, w, b)
            m = len(x)
            w = w - alpha * dj_dw / m
            b = b - alpha * dj_db / m
    return w, b
```

  </TabItem>
  <TabItem value="result" label="计算结果">

```python
import numpy as np

# 计算之前，先要初始化参数，这个初始化值任意指定
w_init = 0
b_init = 0
iterations = 10000
alpha = 1.0e-2
x_train = np.array([1.0, 2.0])
y_train = np.array([300.0, 500.0])
w_final, b_final = gradient_descent(x_train, y_train, w_init, b_init, iterations, alpha, compute_cost, compute_derivative)
print(f"(w,b): {w_final:8.4f}, {b_final:8.4f}")
```

  </TabItem>
   <TabItem value="draw" label="绘图">

```python
import matplotlib.pyplot as plt

# 绘制代价等高线
def draw_contour(x, y, ax, w_range=[-100, 500, 5], b_range=[-500, 500, 5], contours=[0.1, 50, 1000, 5000, 10000, 50000],
                 w_final=200, b_final=100):
    w0, b0 = np.meshgrid(np.arange(*w_range), np.arange(*b_range))
    z = np.zeros_like(b0)
    for i in range(w0.shape[0]):
        for j in range(w0.shape[1]):
            z[i][j] = compute_cost(x, y, w0[i][j], b0[i][j])
    CS = ax.contour(w0, b0, z, contours, linewidths=2)
    ax.clabel(CS, inline=True, fmt="%1.0f", fontsize=10)
    ax.set_xlabel("w")
    ax.set_ylabel("b")
    ax.set_title("contour plot")
    # 绘制最后得到的w,b在图上对应的点，用一条水平线和一条竖直线相交而得
    ax.hlines(b_final, ax.get_xlim()[0],w_final, lw=2, ls='dotted')
    ax.vlines(w_final, ax.get_ylim()[0],b_final, lw=2, ls='dotted')

# 绘制最终拟合直线和训练集的数据点
def draw_line(x, y, w, b, ax):
    ax.scatter(x, y, marker='x', c='r')
    ax.plot(x, w*x+b)


fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(6, 10))
draw_line(x_train, y_train, w_final, b_final, ax1)
draw_contour(x_train, y_train, ax2)
plt.show()
```

  </TabItem>
</Tabs>
