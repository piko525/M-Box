// ドロワーメニュー
$(function () {
  $('#navToggle').click(function () {//headerに .openNav を付加・削除
    $('header').toggleClass('openNav');
  });
});

// スクロールアニメーション
$(window).scroll(function () {
  $('.portfolio .col').each(function () {
    var elemPos = $(this).offset().top,
      scroll = $(window).scrollTop(),
      windowHeight = $(window).height();
    if (scroll > elemPos - windowHeight + 100) {
      $(this).addClass('scrollin');
    }
  });
});

// トップへもどるボタン
$(document).ready(function () {
  $("#top_btn").hide();
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      $("#top_btn").fadeIn("fast");
    } else {
      $("#top_btn").fadeOut("fast");
    }
    scrollHeight = $(document).height(); //ドキュメントの高さ 
    scrollPosition = $(window).height() + $(window).scrollTop(); //現在地 
    footHeight = $("footer").innerHeight(); //footerの高さ（＝止めたい位置）
    if (scrollHeight - scrollPosition <= footHeight) { //ドキュメントの高さと現在地の差がfooterの高さ以下になったら
      $("#top_btn").css({
        "position": "absolute", //pisitionをabsolute（親：wrapperからの絶対値）に変更
        "bottom": footHeight + 20//下からfooterの高さ + 20px上げた位置に配置
      });
    } else { //それ以外の場合は
      $("#top_btn").css({
        "position": "fixed", //固定表示
        "bottom": "20px" //下から20px上げた位置に
      });
    }
  });
  $('#top_btn').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 600);
    return false;
  });
});