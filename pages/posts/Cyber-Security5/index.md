---
title: 网络安全学习日记2：网站漏洞之命令执行
date: 2026-8-2
updated: 2026-8-2
categories: 网络安全
tags:
  - 网络安全
  - 捆绑木马
  - 套壳
---

这个还挺好理解的

<!-- more -->

比如说一个网站，有某种功能是通过命令执行的，这个时候就可能存在一种漏洞，假如开发者没有做任何处理直接凭借的话，我们就可以用 `|、&&` 等连接符来去执行额外的命令。

## Low 级别

比如在 DVWA 靶场中，有一个 “Ping a device” 页面，假如我们非常乖，输入一个正常的地址的话，他会这样输出

![](https://image.smallaw.cc.cd//img1/cp5-1.png)

这个时候我们敏锐地察觉到这就是调用的系统的 ping 指令。

我们先把右侧的 DVWA Security 安全等级调到 low，点击 Submit。

回到刚才的网页，我们试着用 && 连接一个神秘的命令，比如输入 `127.0.0.1 && whoami`

![](https://image.smallaw.cc.cd//img1/cp5-2.png)

诶，是不是多了一行，这个就是 `whoami` 的执行结果，当然我们还可以执行 `shutdown` 的关机命令，但这是自己的机子还是好好对待一下吧（

我们看一下这个页面的源代码，

```php
<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
    // Get input
    $target = $_REQUEST[ 'ip' ];

    // Determine OS and execute the ping command.
    if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
        // Windows
        $cmd = shell_exec( 'ping  ' . $target );
    }
    else {
        // *nix
        $cmd = shell_exec( 'ping  -c 4 ' . $target );
    }

    // Feedback for the end user
    echo "<pre>{$cmd}</pre>";
}

?>
```

可以观察到这个就是简单的拼接，没有做任何处理，那如果过滤掉那些连接词的话，不就可以防御这种攻击了吗？

## Medium 级别

我们再把安全等级调到 Medium 级别，回到刚刚的页面，输入 `127.0.0.1 && whoami`，可以看到命令没有被正常执行。

![](https://image.smallaw.cc.cd//img1/cp5-3.png)

那我们换一个连接符试一下，比如 `127.0.0.1 | whoami`，诶是不是得到我们想要的结果了呢？

![](https://image.smallaw.cc.cd//img1/cp5-4.png)

看一下源代码，可以看到这个开发者并没有过滤掉全部的连接符。

```php

<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
    // Get input
    $target = $_REQUEST[ 'ip' ];

    // Set blacklist
    $substitutions = array(
        '&&' => '',
        ';'  => '',
    );

    // Remove any of the characters in the array (blacklist).
    $target = str_replace( array_keys( $substitutions ), $substitutions, $target );

    // Determine OS and execute the ping command.
    if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
        // Windows
        $cmd = shell_exec( 'ping  ' . $target );
    }
    else {
        // *nix
        $cmd = shell_exec( 'ping  -c 4 ' . $target );
    }

    // Feedback for the end user
    echo "<pre>{$cmd}</pre>";
}

?>
```

## High 级别

我们把安全等级调到 High 级别，发现无论是用 `&&` 还是 `|` 等等连接符都没办法执行额外的命令了，这个时候我们看看源代码，

```php

<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
    // Get input
    $target = trim($_REQUEST[ 'ip' ]);

    // Set blacklist
    $substitutions = array(
        '||' => '',
        '&'  => '',
        ';'  => '',
        '| ' => '',
        '-'  => '',
        '$'  => '',
        '('  => '',
        ')'  => '',
        '`'  => '',
    );

    // Remove any of the characters in the array (blacklist).
    $target = str_replace( array_keys( $substitutions ), $substitutions, $target );

    // Determine OS and execute the ping command.
    if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
        // Windows
        $cmd = shell_exec( 'ping  ' . $target );
    }
    else {
        // *nix
        $cmd = shell_exec( 'ping  -c 4 ' . $target );
    }

    // Feedback for the end user
    echo "<pre>{$cmd}</pre>";
}

?>
```
诶，开发者过滤的是 '| '，加了一个空格呀，这就好办了，不加空格就好了，输入`127.0.0.1|whoami`，也是输出了 whoami 的结果。

![](https://image.smallaw.cc.cd//img1/cp5-5.png)

# Impossible 级别

这个是不可能攻破的级别，就是单纯靠命令注入的手法是无法攻破的。

我们直接看源代码看看开发者是如何防御的。

```php

<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
    // Check Anti-CSRF token
    checkToken( $_REQUEST[ 'user_token' ], $_SESSION[ 'session_token' ], 'index.php' );

    // Get input
    $target = $_REQUEST[ 'ip' ];
    $target = stripslashes( $target );

    // Split the IP into 4 octects
    $octet = explode( ".", $target );

    // Check IF each octet is an integer
    if( ( is_numeric( $octet[0] ) ) && ( is_numeric( $octet[1] ) ) && ( is_numeric( $octet[2] ) ) && ( is_numeric( $octet[3] ) ) && ( sizeof( $octet ) == 4 ) ) {
        // If all 4 octets are int's put the IP back together.
        $target = $octet[0] . '.' . $octet[1] . '.' . $octet[2] . '.' . $octet[3];

        // Determine OS and execute the ping command.
        if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
            // Windows
            $cmd = shell_exec( 'ping  ' . $target );
        }
        else {
            // *nix
            $cmd = shell_exec( 'ping  -c 4 ' . $target );
        }

        // Feedback for the end user
        echo "<pre>{$cmd}</pre>";
    }
    else {
        // Ops. Let the user name theres a mistake
        echo '<pre>ERROR: You have entered an invalid IP.</pre>';
    }
}

// Generate Anti-CSRF token
generateSessionToken();

?>
```

代码的大致意思就是检测输入内容是否满足 `数字+.+数字+.+数字+.+数字` 的格式，如果不满足直接退回。

这样攻击与防御的路线就规划好了：攻击时如果知道源代码就看开发者是否遗漏了或者多打空格了进行针对性的攻击，如果不知道源代码就一个一个试，而开发者最好的防御措施就是检测输入是否合法而不是单单过滤掉连接符。