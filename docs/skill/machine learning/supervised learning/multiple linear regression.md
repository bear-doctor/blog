---
title: 多输入线性回归模型
sidebar-label: 多输入线性回归模型
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 模型概述
### 1. 公式
$$
f_{w,b}(x) = w_1x + w_2x + w_3x + \cdots + b
$$
也可以用向量的表示方法
$$
f(\overrightarrow{x}) = \overrightarrow{w}·\overrightarrow{x} + b
$$
在写代码的时候，我们应该使用向量的方法来编写代码，有两点好处
1. 代码更加简洁
2. 代码运行速度更快，因为numpy会并行地使用硬件资源（CPU和GPU）
```python
import numpy as np
w = np.array([1, 3, 4])
b = 10
x = np.array([2.9, 3.0, 5.0])
f = np.dot(w, x) + b
```
### 2. 输入、输出和参数
1. 输入是 m 行 n 列的矩阵，一行代表一组数据，一列代表一个输入项
2. 输出是 m 个元素的向量
3. 参数是 n 个元素的向量 w 和单个数 b


## 代价函数
用向量的方式来表示
$$
J(w,b) = \frac{1}{2m} \sum_{1}^{m}(f_{\overrightarrow{w},b}(\overrightarrow{x^{(i)}}) - y^{(i)})^2
$$

## 梯度下降法
用向量的方式来表示
$$
w_j = w_j - \alpha\frac{\partial J(\overrightarrow{w}, b)}{\partial w_j}
$$
$$
b = b - \alpha\frac{\partial J(\overrightarrow{w}, b)}{\partial b}
$$
将式子展开之后
$$ 
w_j = w_j - \frac{\alpha}{m}\sum_{1}^{m}(f_{\overrightarrow{w},b}(\overrightarrow{x^{(i)}})-y^{(i)})x_j^{(i)}
$$
$$
b = b - \frac{\alpha}{m}\sum_1^{m}(f_{\overrightarrow{w}, b}(\overrightarrow{x^{(i)}}) - y^{(i)})
$$

## 代码展示

<Tabs>
  <TabItem value="cost function" label="代价函数" default>

```python
# 计算代价
# X 是输入矩阵
def compute_cost(X, y, w, b):
    m = X.shape[0]
    total_cost = 0
    for i in range(m):
        f_wb_i = np.dot(w, X[i]) + b
        total_cost += (f_wb_i - y[i]) ** 2
    total_cost = total_cost / (2 * m)
    return total_cost
```
  </TabItem>
  <TabItem value="求导数" label="求导数">

```python
def compute_gradient_derivative(X, y, w, b):
    dJ_dw = np.zeros(w.shape[0])
    dJ_db = 0
    m = X.shape[0]
    n = X.shape[1]
    for i in range(m):
        error = np.dot(w, X[i]) + b - y[i]
        for j in range(n):
            dJ_dw[j] += error * X[i][j]
        dJ_db += error
    dJ_dw = dJ_dw / m
    dJ_db = dJ_db / m
    return dJ_dw, dJ_db
```

  </TabItem>
  <TabItem value="梯度下降" label="梯度下降">

```python
def gradient_descent(X, y, w_in, b_in, alpha, iter_nums, cost_function, gradient_derivative):
    J_history = []  # 记录每一次迭代计算得到的cost，后面画图要用
    w = copy.deepcopy(w_in)
    b = b_in
    for i in range(iter_nums):
        dJ_dw, dJ_db = gradient_derivative(X, y, w, b)
        w = w - alpha * dJ_dw
        b = b - alpha * dJ_db
        if i > 100000:  # 防止资源浪费
            break
        else:
            J_history.append(cost_function(X, y, w, b))
    return w, b, J_history
```

   </TabItem>
   <TabItem value="draw" label="绘图">

```python
import matplotlib.pyplot as plt

# 绘制代价随着迭代次数变化的图 -- 学习曲线
def draw_costandIterations(ax, J_history):
    ax.plot(J_history)
    ax.set_title("Cost vs iterations")
    ax.set_ylabel("Cost")
    ax.set_xlabel("iterations")

# 因为这个模型的参数多于两个，无法用三维图表示出来，因此没有办法将完整的直线画出来
```

  </TabItem>
</Tabs>


## 关于梯度下降法
### 1. 判断梯度下降法是否正常工作
通过绘制学习曲线来进行判断。当梯度下降法正常工作时，学习曲线应该是一条递减的曲线。一旦出现增的现象，说明可能是 $\alpha$ 选择过大，也可能是程序代码出了bug。

为了确定是否是程序本身的bug，我们可以将$\alpha$设置得很小，这样若学习曲线依旧出现某些地方递增的现象，可以初步认为是程序的bug。

```python title="学习曲线"
def draw_costandIterations(ax, J_history):
    ax.plot(J_history)
    ax.set_title("Cost vs iterations")
    ax.set_ylabel("Cost")
    ax.set_xlabel("iterations")
```

### 2. 选择一个合适的 $\alpha$
这就需要进行尝试。我们可以选择一组可能的$\alpha$值来进行尝试，每一次尝试都画出对应的学习曲线，根据学习曲线的形状来判断$\alpha$是否过大，过小。逐步尝试之后可以得到一个较好的值

举个例子，我们可以选择[1e-7, 3e-7]来作为$\alpha$的可能值来进行尝试
```python
def choose_alpha(X, y, w, b, temp_alpha = np.array([1e-7, 3e-7])):
    m = len(temp_alpha)
    fig, ax = plt.subplots(1, m)
    for i in range(m):
        w_final, b_final, J_hist = gradient_descent(X, y, w, b, temp_alpha[i], iter_nums=100)
        draw_costandIterations(ax[i], J_hist)
    plt.show()
```

### 3. 特征归一化
在实际例子中一般会有多个输入，而这些输入的单位往往不一致，取值范围也不同，例如 x1 取值范围为(300 - 2000)， x2 取值范围为(0 - 5)，此时两者的范围差距比较大，导致点分布得比较密集，cost函数的图像呈现出狭长形，导致梯度下降的速度降低。
为此我们可以进行**特征归一化**，也就是把所有输入的取值范围缩放至差不多的情况，这对于梯度下降法的速度有很大的提升，

有三种方法：
1. **特征缩放(feature scaling)**
$$
x_{j}^{(i)} = \frac{x_j^{(i)}-min}{max-min}
$$
这会把所有的输入特征值缩放至(0,1)中
2. **均值归一化(mean normalization)**
$$
x_{j}^{(i)} = \frac{x_j^{(i)}-\mu_{j}}{max-min}
$$
$\mu_{j}$代表每一个输入特征值的均值
3. **z-normalization**
$$
x_{j}^{(i)} = \frac{x_j^{(i)}-\mu_j}{\sigma_{j}}
$$
$\sigma_{j}$代表每一个输入特征值的标准差

```python title='z-normalization'
def z_normal(X):
    m, n = X.shape
    mean = np.mean(X, axis=0)
    sigma = np.std(X, axis=0)
    normal_X = (X - mean) / sigma
    return normal_X
```

若是要利用特征归一化后得到的标准参数（如w和b）进行预测，我们需要将待预测的输入值也转换成标准形式。

假设现在要对[1200, 3, 1, 40]这一个输入来预测其输出
```python
# 首先要标准化输入值
x_house = np.array([1200, 3, 1, 40])
x_house_norm = (x_house - X_mu) / X_sigma
print(x_house_norm)
x_house_predict = np.dot(x_house_norm, w_norm) + b_norm
print(f" predicted price of a house with 1200 sqft, 3 bedrooms, 1 floor, 40 years old = ${x_house_predict*1000:0.0f}")
```


## 特征工程与多项式回归模型
在一些时候，数据集的数据用直线拟合效果并不好，这时候我们可以采用特征工程(feature engineering)，将一些原本的输入特征值结合起来得到新的特征值。**注意：特征工程说的是由已有的输入特征值得到新的，没有的输入特征值**，因此我们无需对新的输入特征值进行赋值，新的输入特征值由原有的输入特征值可以直接得到。

例：现有一个房价要进行估计，原有的输入特征值是房子的长，宽，我们可以根据这两个特征值结合起来得到面积这样一个新的特征值

又例如：输入特征值是$x$， 而输出是$1+x^2$，当我们仅用$x$作为输入特征值时，拟合效果不好，我们可以采用
$$
f(x) = w_1x + w_2x^2 + b
$$
的形式，这也用到了特征工程，由 $x$ 得到 $x^2$这样一个新特征值，此时问题的模型就转变成了**多项式回归模型**

而我们完全可以利用以前学过的知识来求出这里的 $w_1, w_2, b$，因为我们完全可以将 $x^{2}$ 视为一个 $t$

```python
# 这里的训练集就是 y = 1 + x^2 上的一些点
x_train = np.arange(0, 20, 1)
y_train = x_train ** 2 + 1
X_train = (x_train ** 2).reshape((-1, 1))
w_init = np.zeros(X_train.shape[1])
b_init = 0

# 这里用到的是之前的函数
w_final, b_final, J_hist = gradient_descent(X_train, y_train, w_init, b_init, alpha=1e-5, iter_nums=10000)
print(f"w is {w_final}")
print(f"b is {b_final:.2f}")

# w is [1.]
# b is 0.05
```