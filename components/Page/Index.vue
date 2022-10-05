<template>
  <div :class="'home-' + page" class="fp-page" @swiperch="">
    <!-- fp: first paint 首次绘制页面 -->
    <div class="fp-page__wrap">
      <!-- 首屏内容 -->
      <div class="home-index-logo">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAABcCAYAAACSniuqAAAAAXNSR0IArs4c6QAAIABJREFUeF7tnQe0PUWRxutz1TW7KAaMmBVzBMW0ZsQs6JpWEEQxK4oJMWAEURFMuCbMAcw5omJWdBXTuu4q5oziBtO35/fsuTt37syd7rn3vuTUOf8D591OU91dXV1d9ZVipF4O2L5DRPDvphFx7oj4QUS8LyLeJOkzvQ2MBUYObFEOaIuOe12GbfsCEfHmiLjBnA6PlXS/dRnQ2MnIgXXmwCggOhhu+3wR8eWIuFDGnLxL0m0zyo1FRg5sKQ6MAqJbQJwYETcsmM0HSzqmoPxMUduS5EXayKm7Xv3kjGU9ytj+u4g4Q0TUebu29iX9cdljsH3m1Fe9P/r/s6Q/L7u/VbY3CogW7tq+WkScXMj40yPiwpJ+W1LP9pUiYv+IuFFEnDci/hARp0TE6yW9oaSteWVtXzUi9kv97BAR/xsRX4uI10p6y7L62Uzt2L5ZRDw1Ii7aJSAi4jcRcZykZyw6dtvPjIi9IuIcEfGXRnsIiD9FxH9ExBMkfWzR/taj/igg2gXEqyLinwdMwL0lHZdbz/ZBEfHsOeU/HhG3kvTfuW22lbP95Ig4dE4b74mI26yH9rLId5TUtX3ZiPhWQZ1DJD2toPxUUdsIoscX1L+cpG8XlN+QoqOAaBcQX40ITvZSeqKkp+RUsr1vRLw8oyx2kGtKap5IGVUjbGNAfXFG4RMl3Tij3JYoYvuoiHhI4WDPI+nXhXXg8YXTy1ZJ1UdLOrykwkaUHQVEu4BAxd9lwIQcJmneSb3WpO0dI+LnBe0POt1sXzIi/r2gn/tLeklB+U1b1PYLIuIBhQN8laR9Cuswnx+MCK4zJTQKiBJubaaytj8cETcZMKZHSHpuXz3bqKKopLn0i2TfwD6RTbaPjIhHZFeI+KakKxSU37RFbV87Ij43YICXkfSd3Hq2rx4RX8otXyt3dUloh5uaRg2iZXpsc4q8YsDMXVXSv/bVs/2uiNizr1zj9ytJQrPJJttfjIhrZFf4q5V/R0m/KqizaYsOFPSfkrR77kfZxlFu19zyqdw7JN2+sM6GFB8FRLuAOFOybp+tYFbeLglvy16y/f6IuEVvwekC15P06ZI6tr8eEaUaQZaQKxnHRpW1fbmI+OaA/neX9Km+erb3xpu2r1zL7wjhXw6ot+5VRgHRwXLbt4uIt2fOCCfv+XIn3fZ7eZ3IbLsqtpukz5bUsT3E2LptBAS8sv3KiLh3Cd8i4uuSrthXx/ZPIgJv2xI6XNKjSypsZNlRQMzhvu37R8SLeiaIRXKHks1rm2fFPQonfldJRXdq21x3rlzYz5Ul4R+xLcj22ZM2eMbCD7qPpM5rZubaaHaJ1sBBsnJnuMJv7Sw+CogeTiZjF+/jWKnr/DotIo7HCCiJ/8+mUUBks2opBW0fFhGHFDb2K0k4rs2Qba6ev0vOVyXN7i/pZSUVNrrsKCAyZ8D2xZLB75wRwUmAMQsvvGIaBUQxyxaqYPvvI+KnKRK3pK2DJR3RrGCbl6qHlTQUET+UdJHCOhtefBQQGzAFo4BYf6bbvkdEvGZAz+euu8/bxm37+wPaubmkDw2ot6FVRgGxAewfBcQGMP2vBkv8Gy5V2PvLJBErs0YDX6BOknT9wn43RfFRQGzANGwXAWEbV+ar1DfQBrBzqsvkw3IjSbiyN3+7ZQL6KR3mTpJ+YhuDb6+fS0vj8IgXpS1Ho4DYgCnbRgKieq49CbfmHCexVbLbNrENj0p9nKHttcA2aj7IYCX0hYh4evJ+LXXBf6OkfyrpbL3KphiSnSPi4jjIJdsa16cf46IP/0YBsV6zUetnGwkIok3raFsPlPTC9Wap7asQsh0RhLRDeIJeXBIh+E0tYqjz1NDPGhQANrSznHq28fx8cEQguMDKaCMcxR4zSEDYxhp7+Yg4a4p755kP55KVuOjaRsIRvnsWQDcigv6+Woq9kMO89SizjQQEnp27NXjGCY0Pwam5vLQNPgWvQ2BU/EYS/+0l2/g2cLJXWkNVB9yFi0niJJwh229NGKO9fSxY4PmSHrpgG23jZ1PzBMv+Oz3XQY+GMqJcP5qMuXignpotIGzj+Yf/+LXScx8AGHX6fUTgl07gypslfX4oY2zTNn3R53UiAgCXJiEk6I9+jt8KgS/VB2wjAYFnJ/PTJMLTWwOYbLOw0ToILcdgiODnwGGxg+7E0zGL8z8jgliSD3fFoNjmwOBQom6dCI1HQPywQ0CURtMOWcpoLxeUxL5YiJLLOIBCBKBdIh3OfAPPt2CFIAjh2XcjguvexyX9qN6pbeq9MbXRNZ6DJD2n/mOvgLCNBHxgRFym8Cs5XY6UhDNRFiVosEdGBB6M3I1K6CMRcZSkd5RUKi1r+5yScJIZTNtIQMDzf6wxArSkO7UJa9sscF4DEPxoCyWEIHo1AXSS/qux8EEZPzYi7lL7O4fHhZplG/VKAV5KxkvZhZ2ibMOvuzd4nDMONChQ17+RBC17Cb8NYoy6iHlDs5qiTgGRwlhfClhJzojmlKFTVM65TkXpXsQiKBVEza7xvecuPLWQFvkG25x2LECs4IDZIqmJyAQ/4N9K295GAoL1UT0BcnLt0RSe6fR7VhIMpaxqludUxHnptc0fbNPHwenv35U09zkzHUZgcnC9WTZ1emHmdJTSLABfh71kPagzurRVQNi+VzL6LGtwxCsAaYbKOEO2Hx4RU6rNgh2zgW8riWjGhcg2ixEp3kUzallfh9tIQFRQdm+RRGTjFNl+UkQ8sY8fA34HoOW+kr5Xr1uLj/ilJFTwuWSbeZ0RNn31Mn5nrb87o1yTXwgrUMayooJL2+8oz3Xskk1eVmVnBITt+yaVbUn9T5rBuEgY7VREom0ATQA2WTb9D1btRXD/bJ8QEXfMGNiBknJg3daaGiggrlNq17H9FfwUMsZfL5IdrGX7NhGxt6SpaMl0OpNPJId3hcObFOeOf8emd2LSJP4i6bE5DdvGTpGT2iCnOcp8XlKbXaZPWFEH8GA8NdeTviGp8+l2SkDYvnlEfGCFoyOKbRdJazH6tg+MiFU+i2HAurykEni3ahMDWgt4bS5dpMso1mxgoIAoBjkdABjDULMFRBtjsNEQpzIQ0zOX1/VyRUDBLXOBDQVbyrLoGpKKENFtD3XgWsaYT5B0566GJgIiZZHijtd8nVjGIOptcLID5w40OBDhq6bPSLpuaScDsBSy4/wHCoi7lcLg2/5ZspmUfP5gAZFeFdBaeJlYT1pUSDT9OYaO/b2Sbl1SOb0O4nC2UXS0pE5w37qAaFqkN2rAq+h3X0kYL7NoIEoxT0tY6ntpoIAggvRqksgL2ku2CSu+T2/B2QKLCAjwKniK2wi6paRB2u8AiPyu7ztviS/QEvtdhN8vloQm30prAsI2vg2D/RYWGd061cXxZofc/BIpmU2p7/yXJQFg2ksDBQTtAsmOx+C8FyGesvAzmJdPdN4YBwkI27xA3bP341dXAEBfEhcB8FtMttFq71pc8f8rzD2Jm+0mbYtn4Qsu0Ocyqr5HUic+aiUgPhERWzLarIBDD5IEFHov2QbHsfQFZD0ERO/Yl1CgWEDYxmX39Uvoe9EmsuegZcNy5R3q38JLAGHhM67dXR9kGyzLmZefRRkwoP4pkjpzwGiB+PYBY9nQKl+SlOXTYRs3cpxMSqik/SGQcyVjWaRskYBI6Eo4JpVCui0yxnl17yVpCO4DmvQQ5CnG8hBJR+d+UPKrwaV5MxDa9SW63NIREDi64PDyt0BXzPGNGAVEPiblgNwbq15nuDZjC8iK56gPJhnq8dkpoZ9LOn9JBdu4Rm/01aI+5M5rBgKCZ8ZOI0Xmh5NjcO0OuALPNJxhUP1wqV30jfh+knDLnUujgMgTECloj/DgXpf9DobjfYlrPHNcxVTgk0BeCl4DztM3Vx2/P01SKQYlGsQQtKjvScoOC7CNnQZ7zRBC6MEvXl0wViMM2RfAIRK3hJvCUGrNu4KAILtPFSZb2jheaM+ogmnSGzhvqgidZgBNadssnkMlrb1Rk7I+5ZIAQDbrqtDS4ZMl4d03CohuDmRfMWyTpu+APn62/M5rw+MlgbPQSrZZ+MQADUmoSwDTuSQRk5BNtnHPzs6qlRrG0YrQchwBe8k2Pjm9Xp4tDZHk+XnzfG0SoA2pH4e4D7xOErB8U4SA4PlsiKTuTFSb/O+RckWqV21kRPB15jq0PfRJ9uWS9uubxVGD6NcgbJ85nfrAypdQdoJjGrV9vRSFWAr4eldJRUltVi0gCnOtVDwlpohAKpItZZHtB0VEtk0kNYqAQ9BNRcAiIFBTSjJI0d5HJc3NXbmAV+Zpkv5hHicSDgBPflieSygL3WcUEFkCoiSxUDVHRS7pVSXbrAfia0oCq4pS6CVhtFINwjbu5yWnO9d2cniWvqghWIe8LM0kFEZA/HZA+G2WU4ptMkuTYbqEniPpoL4KtrElEDdSQq1qVLOBUUBkCQheCmZU0jmT8SJJpdm2J83Z5hpcmuw22/191QLCNlduPFtLDjWwNdHEB5FtoluJcs2lGaE6VEDwLAKgx1zKiIRsq38PSa/LaBuciuf1lWv8PgqIfob12iDS0yYHSxdcWbOXUyVhSFuIbD8Gm1dBI3OzY7UcDCvTIBKcAQBHuTSFpp1bqeWbStIvAtgDRN7En2OogMBjbQqxpu0DbLPR71b4cftI6g2SGhjoNQqI/snIERC4U5ekARwU/tyxpkriSwCYyXY3X6UNwjbG1sf1s3+tBMKXp9oiI2sHv3CAxBEyl24n6Z1V4aECAmNGb/IQ20Bc1ZF+cga5nyRi4ueSbUA3n99XrvH7KCD6GZYjIEp4v9SMUoXOTNnxMbBlxQIC7QGw2BzitQKMlKWQ7ZK+SSVJ5rA1GgVEyxSMNoj5NgjbJDQGFjCHjpGEQFkK2d4pZbbK8dzkJAYXkmfPXlqxgMDICi5kDl1PEpCNSyHbPBcfk9nYsZLuNwqIOdwaBUSvgCjRDKdU1sxFOreYbaz6xMvkEGhJBEX10qoERDJQ4qF5rt5BRGShYWW0Myli+4oRkZuxfQoeYdQgWji9iQUEQCxcq7pCvgHkAekYyLLOGP+exZVzxQAQFZCTPsLz7/zLTk9Q+FxIiDwYFb20QgHBSx4vejk0CJFqXsMprQC2mxyti7UFIjhrabxitDF2kwoI8oBkw8cNtNHAjhwBgZcrDkx9tJTXi2YnhXaI3Zowh12DXqGAKDHqzg2/7mP4nG/j1ZH8Mn3ECwaI4GuRraMGsXU0iBtLOrFvduu/2ybGofR5MUdAAD58jYyxfEfSoijlM90Uvu+Dg4rm1UsrFBDElnyydwB/LfB6SfNAkjObmS5mGxi8tvwyzfaw1+A/spYEaxQQW0dAZEWiNgQEsQ6lcSs5AqIto1bbwi0KZMpd+bZByu6NqUntXVdSlv/BCgUErxdZY4iId0rCS3WpZJv0DJfOaHTUIPqYtEmvGLtKKvE94NmOTNRkpC6hHAEB7HxnrEytM+IIdsx9RcgdZKF/TTaI7AoFBBid38r8vkEYqvPato1xFBsE9qk+wr/popIAwRk1iDZujQKi9xUDePZOJOQGT29aReT2rczc3wsjkC8jKStCc4UCAvdqXjFyAtt+Iomn3KVRIfblFyRNcEXHK8bWuWJsJg2iJA4mG+07Z0ckSAFwJ4km7SPu07yiZEHBrUpAMEjbuUZCime/vPQxIPW9b0rIk1P8lZIov0Z/awLitZJ6gVVHDaJXgyB/6hE5qw3VWhIQfkuhwixsn5OU6724ak/KEnvQUyQtLSOZ7dwrIXNEasPJ3G5lAcE7/1GFq+64ZhaojisGlndQskroZEk5lv2hmbU2kwbBEydPnbm0UFRivRPbvNODXJZDr5ZEAqQsWrEGQWrJXPfpX0giB+zClEBksEXl0l71hNt/awLibZJ608HZLnFsqRi/atDazSQgwGcAjyOXsnkzr8EBOWMfLCnXxXjVGkRpBq+laBG2PxYRWflaIgLQmJ3qmei2soAYkmA469ltwEJkXZ8oiSzgvTQwL8amERB8oO23R0TJc9yTJJHsdxDZBquSeIYcS3zVx6Ul5XowrlpAYKhEqOZ4Mw4af5OxA5ITf0XSlK/EVhYQpRK54t9dJIHs00m2iVQtBch9q6Q75az+bSIgCOPvxe1o8GNQ2HdKBkwsQYkt42uSip54V3nFSEKVFHuAy+YShk0OBp4oi8g2WgPaQwk9VdIT6hW2soAoeVuufzM+5teWhDfgDNkmRd9UtupMDr9EUlaE4zYREDzZES1Zmsu1KI+mbXBNMbJlu5mn+TpAUlE6h3UQEHhIAvRcQmBE4g2KV2wWLZAM+LKScKia0FYWEKhqMG8IMC5CAgAPNAnaAJMTA+OjEuR61kQ0CmUnbNkOAoJvt002LbAPS4m8oYf1LXrbAAwDmXbewg4AWgFwBQGWTesgIEiLCEg0GdBLiITXgM2QR7MzdD2FwrOGc42h9TG8W9JtmoPasgIiLVCALR5WwumWsjD8LAvkdqiaBHfgpzlj2UYCYqgWB5swiOFw9eHkhow6DdQ9+U1vmvJiDI3jyNbm6vO1agGR1uwQqMRqmDhbvTVdHfCqRdjwosOr0g1TblHW8hBqtXFtdQFx3YjICsQZwrGCOlPeZ331touASAu+FLy2iz1ED3JtKb2yNNtDeyDYKEtYb4CAQPMl+XKOV2XfUoJnpdpIW5udIeZbWkCkBTokYrGP8aW/7y2J0zCLtpmAIAkMyWA2C81At+cObD00iLRmgWEEdGezUKc7+nYQEBgUMSxuFBWHNG8nAZEWPNe8CY7hRk0EKfxK0uA1x7leAiLxrMQ/YZUsJTNeJ5julhcQidkl0N7LZnZWjpCGKjsku/em8oNo2VzYEuYmU1o241va20VSaVb2STPrLCDQvLgGLXqlWoSt35Z0uXkNICC4x5Qk86C9nfss0GnjlmAXVuPcXxJW7myyPcQ1Orv9OQWzMnW1bKb1EhBDBOdVJFGviFKuDOqVJkoq6mdO4XtKKn1CnGpuPQVE2h83SIl4l8WDknbY9ziSzfWxQECAG5gTGVfvPDdxTklYcNV+Vgbulk03JB9hCUObZQers7ZJXluaibkY6bgQ3LX6PlK9lWawWqtrm5T22IRK19Mi80DdQyQNSfLbFBCcpt8sHAxaAHlispL3tqxbnnL/pbDPZRS/VpcvUL1xBARPJxco6BGBcr4Ks25evYF5MbL9CVqYXZKcpOCTZ4ryvMRGOnVII7bfnZ7xSqoXhwAX4iZUY8l+rm0bvG3QpkmujLBYD3qCpKcuo6PkR9CbEKrR148k5QaPtQ7TNsl9irTmBb6X7FnAF2a9/iEgXh0RvSHQtQF9U1IW5PhA4NSs60sXg2yXRM0N4TMCldM8C0q9YxM9MyIeXdA5yEwIZf6bTbbxJNw/u0LE9yXlAJvObTLFTaAlAbe+Siq+jvYNxjYI2CVemx+SVKoNzgzD9l2Tl2VuOsO+T2n7nQPtDpK+lFsZAYEHYavbcUcjD5WUldEq+dBz1yFxaQ69T9IeOQXnlbF9QES8ZNF2WuoD946GA2DJYLINkGy262xEHCkJDIYiKsyHQNuPl/T0ok7mFLZNJCVJW5ZN5MXYtxSCL2cQtkHKyn6yBv5fEsJwYUraF5oE/j3LpjeQ7DoXPKfqXPyPbe5A3IX6qBgvryCiDAw84LaLHVzaBm2bU+Do5GHW9119v3NyP0vSU/oK5v5uG9DVHFAQ+HEpSb/Pbbtezjbq9+Mz6gLLdvmhd+mu9m3fNiKI4sRDclH6Q0SgIWJzGHTnzxmA7VxQ3qxUjjl9NuaMgKlHRARh9YsSuCYEYXFTKKY1AQHZRnLNS3T6oYjYUxKTVEQZVw3iIe6cm7+gpHPbt09JZIY8waGS4WNB6vofl/SbUzZj8/IqcKucRMnz+rONxjcv/R0b4taS8PBbCdneOyJI6YYbdSkRso3HJhmvB9l9Sjq0jbsycSYkIOqiLHSykn7rZW2fJyIOjAgCvHYZ0A4w+y+X9IoBdSdVJgIiCQnUKwZFRmDi7pHSXD9eI4nTeDDZBn4dqUhGpir4hsgxDHaPWzbycXOgSaPA1nKd9K/r2sNixM/9/REBItEauu+qyDb3V9CxEGAEjRFIRmjz8YvgJ7R8/54R8YCIIEyeb+e7EEBvkIRNZF0oPUmD8kQoNuCo4Dw0CY2NsfGaQiKZd6zL4Bqd2CY6l2A0VH5eZhgXuUnAbXzTeo0pRWcSSAXP2Edtbgk8V7JuTyEMX1IJilTnp0wJiKpUCrFFgv120dOrZaGyCS4SEX+QRIDOupNtBBRWdoKDOC3YLET+kRexxDawtLGnE4PI1N+v8pS0jYMO/34nCc1twyjZqHgBAJadA4k4CoLnfi6pBLFqpd+Q9gMxD7+RxAvWhpFt1ixwdMRyENeBRo+d78eSeGFcKrUKiKX2MDY2cmDkwJblwCggtuzUjQMfObB6DowCYvU8HnsYObBlOTAKiC07dePARw6sngOjgFg9j8ceRg5sWQ6MAmLLTt048JEDq+fAKCBWz+Oxh5EDW5YDo4DYslM3DnzkwOo5MAqI1fN47GHkwJblwCggtuzUjQMfObB6DowCYvU8HnsYObBlOTAKiC07dePARw6sngO9AsI2gVWvqkUZEuTEPyLaJnDztq8VEftEBGhTIPWCmEt47wzZJj0YCDqkIvtWRAAbxn/XyDZZgogsfaQkILKqv5Mc90aSyE6URbYBBiW+njGTv4G06kTkTZFtolWvFBGgIhMEAxDupyTNYCnY5vdnp2jPrhyfwMB/uor6s02yW775PpJ+Vfumo8guVY9YtH3piOAbAYqZCmhL4euMiehCkIFIcd+LFZH48IwUCQivD6yPozYegoEOY87bMAsTAtk7m9GMKSP6DSXdt9bWLVLINFiPrAkSDDH3nWSbOSA8ncAjxgnCFbgIh0r6RK1tgGjAD5man7S2ztrE7rBNmDmRmYDqMpYPSIIf88ZyCGtBEtgd1RoE7OcgxljPHG6biNyLS+K35toiQpq9QWDgF0ATawMdSgl3yZlBkmJwQMAgAeFqQrbZs6ytEyR9vG3wtklDQNQya55ALpIGv2JIMFeOgCDLNejUbArCcwl5JRz5pZImYJs1bAOwBZgAoOlgSpNZhKEStgo6E23RJtj8L6pNAsAsbOpz1Be/bUJsSVLTO27ass1ksZEZL2CkbPqrps3x4gbjQaDit13T3z8bEZ9oW9C2EXzUR4Ds3jFJhG0TqrynbVKjnZT4CCJVXehRjnD6e9W+n9Dsd4GdIAl8x2pxsvmOjQiwOdhAjPcWfVDvttmohK+DQ0g0Ivy/axsiUw2N6x2SwNJozh9Rr+dszoFtvoOIwkn4tu0TIuKOqV/Wz2clsZE6KYXlMxcIKg4bIP6IsH2MpEm2attA/gFP2IQsWENpb/l7BaAMDxgLuSjnAgDZZk0S8n3mas6SIECoHyVpkvYxff8M/Jxt1jkQByQgRpAjqIgMvaikHzTWYIXJ8pmUXZ5I19tKYi1Ua4C9BQwDuU0PnbP2+IlvJSobgUPEMojlhINnU9ZGqw2ORcAJOANCYZuN+CBJnbkBbb8zIohrB19xAttG2G8dIShJwOe2TPIalmOOgLC9c0SwiJD0E43D9vPS6XyBNshv22BUsNDRYlopleE3hCdZiWZATNKCYTOAC0kIM4lXOUmaGw6eHiHp4BqfbxwRHwWHQBKLpVocLIxTJE0wE9FmJBEmPW/TcRpRbpIE1/YZ2rAubIOHgYZziYQwNQWvZxvwEhbZBBXZdjXeKch82yxs8DtZpEVkG+2SUOYpHtR4AX+uIGkKHNc2mAgA73LST8g2p+j5JYGnkE1pHicZyW2z0W/GoSMJQctBVME2okF8vzZGtKXD67xK5U+LiNNaxngcWo6kNVTw1Pe3JLHBqzWAgGC+H9YF/ZjqgSLFIUs7hNPDF7QxeIAQzaJsAVGbsIMlHdFs3TaI0lwJiOufIdtIQyTmA+raQkdZ0I9QM5n8ejZj+gWotBfY0/aRANS0CZPEQE4kMkdPkW1U+p9JQkVr+w40HpjNSYkweZOkGSQu22xKsArRSL4r6VYd7ZUICLKR7xURd5JEEtcsqngREQdIQmC1km3wQMnZAWYH4+cqcY8WHqG9fFESmhELkGsZ2bSnMq3b5tRGw2GBFlG6ZsFfkMbQRJrzxEa9GnB8jZ+4hqBBTP09aTNX7EsU09IP38aVZeeEI4I2w8nN+toNFDTbb0vIX1OHo20wLb4sCZCeCSUYPkBwmgclGvk+ks5Yy9HRPOByBcTRdW3NNiAzCAaupGCFZlGJgGDjk4a8NfdhQt9BJeOeT9mTJXGyrFG6A6IaI/Xn5h6wzV0RyC8kLdISpqCWswBPbUreti9N2sqV21Kx2UbdIukNdoHmwusTEKiMO0ja1TYawQs7hBBXCjbQH6sToWOcCIjDJU1QrpMNBjvJ7nV48iSkudogkICH269t83T0UyFps7k5faauWGmOsGkwXr4N9C9sIDNrxDaClYOiwjTlGx7SRB2zzenJKYqwAeAEW8s8GLf6Jqoyh+8l6fiWeeIaAjgxGk51YLBWAFOZAT+2DRjvY9OVBYEFZBz155LttXwrfGv6/ydJ2jEdAPRzb9vsizfXr4mJn/DliS32EK5OAO9eXxLrpNojCB7wO09PVwL6xQ5S50uugDhG0hTMYDoYp65Gfd+/TAFBfj8+Dlg37ni/kMS9t/p4TlLU5etI+vy8gdXu+FxHYD7jRL1GZQejsRclO9krbi5ph5bFxcQ9u8O+0CcgqMuYsA2QTwSVdWojp8WBgY2ynGRoVtxbZyhNGgY4DIMVryqV9QaSwBaconS6cAqglYAlifrcSwlNinGAczhzVUxjQXgiBFHRMRjOJFhJJykbE2Mq5eDFmZpXHdtcRTHM7psM0j+UxNWgl2z3CQiuq1wDMVz5qDiPAAAD50lEQVRX65ixc48/vVL/azxlLMD7YZdChSenKvayuWQbewF2F4zwbNY/SdrbNmsdmxAGWH6fuQolfs5cLW0D4IswvmQ9fUK6/mJ/wk6HltgmnAcJCNt8M4fDjCCfx4BlCghULq4PrZvXdqWBfFASRrNOsv1w0ItbbBBMCpupd9y2WTicPNes5wGwDfYjeSRbE9HMu2LUtCQ0JV53UCFR+bELTF1J0uLg9AFbEW3gIEkgMjc3O0LkXZJAf64ERJUlbEoF7aj7OU78voVe/z3ZGc4maaeWPhE82G8wZsLDk9pSEdhmESMEUV2xZ2CIa34b1xVyik5sH7njzBAQWPCx/0y+gbZtY5i7mCTmZ0K2OazQ/Fqvjj3rkTlE60BY7JGuFXzTdyOCA2XmSpPGgsZ8E0lT+TeTbQYA6KaBFSHGAbiTbQQwhn7wYevfURkpOxNMpbU3lZTXdpU7FQMzGkoW9W602gLifoU9YGL8aAwc+wC5G6q7NpiHU9l7bFdpz4HgfkG6PnA/gxF1Sy3aCDaNs9eTxdjmWRWDUda4090YAw+bGFh3jEr0jaqLoWmGkrr4k46rCZsZe8Lkflup4gmangWzRmmSjksqKE9xwM/P2G/SSYRqiXbEJHIioxF8RNIEATo9b2F1R43m/soJS64Drgut2kltLMDro0lhBGNDwWsE8ORJLo13Kq1BpV5zSkoCPr2+UBkbGwC6Upt1vNoI2CHSNfHXubksasbQ1o2QBBRXyOYmw86FPWTqoErZzJhzTmiuJMzx1BNi146xzUsMdhDGPzG42kYb4hrNtYPDa4ps86SK0ReNmRcPTnD2AAZpclRMpdxLNhtsLlxnKg1qKnMYxuWkTYPyjfsB2von65s+zSWHEnsIDYeXGJIYFefwyNpoacGjonBv4r7MU1uTGXw478oIEtrlVJ3JOGSbOygnMFZqVEI+mLv022sL+t7pmZOFhzpfbTpUPIw4qLa9ZJtFsiaVU1/UAcUZdOdWsg1jAa/l9KxvCDYuaiECCiTuakx8BzYV7ny8T1d/Z0NhwFy7QyZBgADFV2DKdyLd6bnzY3Nh8aLi35110hgDVmmEJzyhHAasqTtq20clzQftparHGzpqfzVWrhJsdhbn5E6cxs1LEGpym0GX337V9TKQnpnxV2DtMM88CyOse8k2ryiM6YGS4McUJX8MBFdTc0N4nqtu/0rfwUsWm5QNxb+3tb0qdfAP7ZeXG5DG67Yirk/YNshW1ZrwOPkHIZixjawNJSIe3pZoONlJuFqsvVrYxs7CfkFT4hpTzRdXOvYAPOUfWsrErpcEM4ch+5D1eXIy2JfmHY3/A17aNbDG7RSiAAAAAElFTkSuQmCC"
          alt="miHoYo" />
      </div>

      <div class="home-index-slg">
        <!-- 中央标语 -->
        <img src="/img/slogan@2x.301d3f9.png" alt="" />
      </div>

      <div class="home-index-action" @click="showVideo">
        <div class="home-index-btn"></div>
      </div>

      <div class="scroll-btn scroll-tip">
        <div class="scroll-btn__mouse"></div>
        <div class="scroll-btn__arrow">
          <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSImI3g3QkFEOyYjeDU5MzQ7XyYjeDYyRjc7JiN4OEQxRDtfMV8iDQoJIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgOCAxMSINCgkgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOCAxMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IiYjeDdCQUQ7JiN4NTkzNDtfJiN4NjJGNzsmI3g4RDFEOyI+DQoJPGc+DQoJCTxwb2x5Z29uIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNGRkZGRkY7IiBwb2ludHM9IjUsNy45OTggNSwwIDMuMDAxLDAgMy4wMDEsOCAwLDQuOTk5IDAsNi45OTkgDQoJCQkzLjAwMSwxMCA0LjAzMywxMSA1LDkuOTk4IDgsNi45OTkgOCw0Ljk5OSAJCSIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K"
            alt="btn__arrow" />
        </div>
        <div class="scroll-btn__line" style="display: none"></div>
      </div>
    </div>

    <div class="home-index-bg">
      <!-- 首页背景内容 -->
      <video
        src="https://webstatic.mihoyo.com/upload/op-public/2021/08/12/c7f405d6cbb03e5c668a12d3e0de290a_2683598109381103734.mp4"
        poster="https://webstatic.mihoyo.com/upload/op-public/2021/08/12/7a388979f57b0943e38a4fd33ea6d593_3621961254475262927.png"
        loop="loop" muted="muted" autoplay autobuffer></video>
    </div>

    <div class="home-index-bg__mask">
      <!-- 首页黑幕遮罩 -->
    </div>
  </div>
</template>

<script setup>
const page = "index";
function showVideo() {
  let isShowVideo = useState("isShowVideo"); // 控制是否渲染视频，传入视频地址字符串则渲染
  isShowVideo.value =
    "https://webstatic.mihoyo.com/upload/op-public/2021/08/12/72d301e9cf955eee821909d756220686_2232999530661425548.mp4";
}

console.log('%c你发现我了，这是我的简历，我没钱，请给我工作QAQ', `
    font-size: 16px;
    color: #4ea1d9;
`);
console.time('2012')
console.log('在下的简历：https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b02b7f48-0227-438f-8c3a-3a5f94afa017/04523df2-775b-4ab5-aff8-e16608901676.pdf');
console.log('%c', `font-size: 20px; height:50px; width: 50px; background: url('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b02b7f48-0227-438f-8c3a-3a5f94afa017/8227af6a-dcb2-4a55-a5de-e0e5386d6305.png') no-repeat;`)
</script>

<style lang="less" scoped>
.home-index {
  height: 100%;
  width: 100%;
  position: relative;

  img {
    width: 100%;
  }
}

.fp-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fp-page__wrap {
  // 只有设置了定位 position或 display:flex ，z-index 才有效
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-box-orient: vertical;
}

.home-index-logo {
  transition: opacity 1000ms;
  transition-delay: 200ms;
  position: absolute;
  top: 0.22rem;
  left: 0.7rem;
  z-index: 9;
  height: 0.46rem;

  img {
    width: auto;
    height: 0.46rem;
  }
}

.home-index-slg {
  z-index: 9;
  width: 5.74rem;
  max-height: 3.7rem;
  margin-left: 0.84rem;
  margin-bottom: 0.44rem;
}

.home-index-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: -1;

  video {
    min-height: 100%;
    min-width: 100%;
    transform: translate3d(-50%, -50%, 0);
    position: absolute;
    left: 50%;
    top: 50%;
    object-fit: cover;
  }
}

.home-index-action {
  position: relative;
  z-index: 9;
  width: 1.1rem;
  height: 0.56rem;
}

.home-index-btn {
  position: relative;
  width: 1.06rem;
  height: 0.56rem;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAA4CAYAAAAVZ21rAAAAAXNSR0IArs4c6QAAAm5JREFUeF7tl7/LEnEcxz1OCBp8nBwSLlwa7gQXeQjBCIyGihAHoWhxKmxqzAgOIfqBs4s03j+QQzjKhYODj9KiQyA43CDcFAiBXTj0EFE95zvuPb1d/by/L3i9pjOiKIpS+lEN7Pf7XRiGt3O53Ke4YOMQyjCM+3EHuvt/A/1+/7TVaj05xMrn82dxXlSoOJYSuPE872aj0Xi03W4rlmV9uQihUBcZSvD/4XB4p1ar3Vuv16e2bQf/QilUgiHiPO37/oNSqVTebDbXHccJ/7ZRqDg2E76Zz+ePLcu6EgTBDcdxvv4Jp1AJR4jzvGmaxnK5fJbJZMzxeHyr2Wx++32nUHFMEm6y2ay5WCyep9PpcDAY3HVd9/uvWIUiRIiLsCzr0nQ6dXe73edCofAwlUqdf+MqVFyLpLtisXjZ9/3XQRB8tG376U+sQpECHIOpVCono9Ho3Wq1el8ul18etgp1jEHibb1ez3me92Y2m/Wq1epbhSLKPxbVbrev9no9dzKZvFCoY+2R7zudzrVut/tKocjiEVwURR8UCjFH3igUWTiKUyjUHHmnUGThKE6hUHPknUKRhaM4hULNkXcKRRaO4hQKNUfeKRRZOIpTKNQceadQZOEoTqFQc+SdQpGFoziFQs2RdwpFFo7iFAo1R94pFFk4ilMo1Bx5p1Bk4ShOoVBz5J1CkYWjOIVCzZF3CkUWjuIUCjVH3ikUWTiKUyjUHHmnUGThKE6hUHPknUKRhaM4hULNkXcKRRaO4hQKNUfeKRRZOIpTKNQceadQZOEoTqFQc+SdQpGFoziFQs2RdwpFFo7izkOhD2jHM/ADHdbwJ8875eoAAAAASUVORK5CYII=) no-repeat 0 0/100% 100%;
  cursor: pointer;
  transition: all 500ms;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 0.14rem;
    border: 0.1rem solid transparent;
    border-left: 0.16rem solid #fff; //.17是等边 .16是官网
    transition: all 500ms;

    // position: relative;
    // z-index: 1;
  }

  &:hover {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAA4CAYAAAAVZ21rAAAAAXNSR0IArs4c6QAAAodJREFUeF7tl09Ik3Ecxt/xRjGxQo0iwyKIKV6EGjIjp7YwyRiIJy3wqCEMhCLGCH5EZandu3jwoIdu6sE//aW8F0SB4J9Dh8HCiTI3MZzhIYmo/O2J9zk9u+77/D7w+ZxeX3RkfsfRj2pgJ7+d+55db57uDc3Zgn27oSa6KqO2A939v4GaLlNbUd/es5lNN7+MNXyweVGhbCx5cHPh1mDjyeDVm9mNbxdfxyKL+yEUaj9DHv4f6nt2ray67vp6Kln7PtGS/BdKoTwMYfP0pcRYx5HTVcHtZCo0Y1rSf9solI1Nj28a7493+4+Vl+dSmfBb05T5E06hPI5g9bzr+iL9U30H/MXu15XZK1+M2fp9p1BWJr0/Olh02G14MBn3uW56dvVVq2NM/leqQnnfwJrgLz11KGyem/zW5qcXtyOdjuPsfeMqlLVGzmFxRaAoHB/tz62lpt7EW3t/UhWK478gSsm580fr7gwPZJJLw+9M+73dsUIVpJB3fCIYOR7sfvp4bfnz0NyjG08Uiue+YNLZy51nqjvumvTCx4RCFayPOwhEewKVbbGHCsX1DtGiI/MTCgWp444UiusbpikUrI47VCiub5imULA67lChuL5hmkLB6rhDheL6hmkKBavjDhWK6xumKRSsjjtUKK5vmKZQsDruUKG4vmGaQsHquEOF4vqGaQoFq+MOFYrrG6YpFKyOO1Qorm+YplCwOu5Qobi+YZpCweq4Q4Xi+oZpCgWr4w4ViusbpikUrI47VCiub5imULA67lChuL5hmkLB6rhDheL6hmkKBavjDhWK6xumKRSsjjtUKK5vmKZQsDruUKG4vmGaQsHquEOF4vqGaXuh4Bc0pBn4AfBTumBicdXLAAAAAElFTkSuQmCC);

    &::before {
      border-left-color: #4ea1d9;
    }
  }
}

.scroll-tip {
  position: absolute;
  bottom: 1.24rem;
}

.scroll-btn__mouse {
  width: 0.26rem;
  height: 0.4rem;
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSImI3g1NzA2OyYjeDg5RDI7XzFfIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIg0KCSB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE3IDI3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNyAyNzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IiYjeDU3MDY7JiN4ODlEMjsiPg0KCTxnPg0KCQk8cGF0aCBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojRkZGRkZGOyIgZD0iTTguNSwwQzMuODA2LDAsMCwzLjgyOCwwLDguNTQ5djkuODk5DQoJCQljMCw0LjcyMiwzLjgwNiw4LjU0OSw4LjUsOC41NDljNC42OTUsMCw4LjUtMy44MjgsOC41LTguNTQ5VjguNTQ5QzE3LDMuODI4LDEzLjE5NSwwLDguNSwweiBNMTUsMTguNjA3DQoJCQljMCwzLjYxMS0yLjkxLDYuNTM4LTYuNSw2LjUzOGMtMy41OSwwLTYuNS0yLjkyNy02LjUtNi41MzhWOC41NDljMC0zLjYxMSwyLjkxLTYuNTM4LDYuNS02LjUzOGMzLjU5LDAsNi41LDIuOTI3LDYuNSw2LjUzOA0KCQkJVjE4LjYwN3ogTTguNSw1LjAyOUM3LjY3Miw1LjAyOSw3LDUuNzA1LDcsNi41Mzh2NS4wMjljMCwwLjgzMywwLjY3MiwxLjUwOSwxLjUsMS41MDlTMTAsMTIuNCwxMCwxMS41NjdWNi41MzgNCgkJCUMxMCw1LjcwNSw5LjMyOCw1LjAyOSw4LjUsNS4wMjl6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=) no-repeat top center/0.2rem auto;
}

.home-index-slg,
.home-index-action,
.scroll-tip {
  transition: transform 1000ms;
  transition-delay: 200ms;
}

.scroll-tip {
  transition: transform 800ms;
  transition-delay: 300ms;
}

.scroll-btn__arrow {
  img {
    width: 0.08rem;
    transform: translateY(-50%);
    animation: scrollmove 1.4s ease-in-out 0.4s infinite;
  }
}

.home-index-bg__mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAE1JREFUOE9j5BaRuvnr+2cGNk5eBhighM8IMhBuEhUYKAZS4jKQW0D6aeNCargMFge0cSE1Ync0DCGhSI3Ypk0sU8Nlo+lwtDykoOQGAAxCqvFBleXSAAAAAElFTkSuQmCC) repeat 0 0/0.2rem 0.2rem;
  z-index: 1;
}
</style>
