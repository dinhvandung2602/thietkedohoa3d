$(document).ready(function () {
  var isRunningBoxEffect = false;

  function openDropdown(drop) {
    var img = $(".item-parent img").eq(drop);
    var childContent = $(".item-child-container").eq(drop);
    //
    if (img.css("animationName") == "RotateDropdownBtnClockwise") {
      img.css("animationName", "RotateDropdownBtnCounterClockwise");
      childContent.slideUp(200);
    } else {
      img.css("animationName", "RotateDropdownBtnClockwise");
      childContent.slideDown(200);
    }
  }

  function centerRightSideNav() {
    var rightSidenav = $("#rightSidenav-drawer");
    var offset = rightSidenav.offset();
    var width = rightSidenav.width();
    var height = rightSidenav.height();

    return {
      centerX: offset.left,
      centerY: offset.top,
      width: width,
      height: height,
    };
  }

  //add event listener
  $(".item-parent").each(function (index) {
    $(this).click(function (event) {
      openDropdown(index);
    });
  });

  var box = $("#boxEffect");
  box.html(content[0]);
  box.css("top", centerRightSideNav().centerY);
  box.css("left", centerRightSideNav().centerX);
  box.css("width", centerRightSideNav().width);
  box.css("height", centerRightSideNav().height);

  $(".item-child").each(function (index) {
    $(this).click(function (event) {
      if (!isRunningBoxEffect) {
        isRunningBoxEffect = true;
        //
        $(".item-child").removeClass("choosen-item");
        $(this).addClass("choosen-item");
        //effect
        var box = $("#boxEffect");
        box.html("");
        box.html(content[index]);

        box.css("top", event.clientY);
        box.css("left", event.clientX);
        box.css("width", 10);
        box.css("height", 10);
        box.css("background-color", "red");
        //
        closeNav();
        //
        box.animate(
          {
            left: centerRightSideNav().centerX,
            top: centerRightSideNav().centerY,
          },
          300,
          function () {
            box.css("background-color", "rgb(255 255 255 / 0%)");
            box.animate(
              {
                width: centerRightSideNav().width,
                height: centerRightSideNav().height,
              },
              500,
              function () {
                //load new models
                LoadModelEnvironment(index);
                isRunningBoxEffect = false;
              }
            );
          }
        );
      }
    });
  });
});

var content = {
 
  0: '<div class="info">'+
  '        <h3>Th??nh gi??ng Hand-painted</h3>'+
  '        <h4>Tris: 5.410</h4>'+
  '        <h4>Dung l?????ng file: 603kb</h4>'+
  '        <p>M???t s??? k??? thu???t ch??nh:</p>'+
  '        <p>- Texture ki???u v??? tay</p>'+
  '        <img src="images/content/char_thanhgiong1.jpg"> '+
  '        <img src="images/content/char_thanhgiong2.jpg"> '+
  '    </div>',
  1: '<div class="info">'+
  '        <h3>Gi??o vi??n phong c??ch Stylized</h3>'+
  '        <h4>Tris: 11.316</h4>'+
  '        <h4>Dung l?????ng file: 3Mb</h4>'+
  '        <p>- D???ng model chi ti???t highpoly (c??c n???p v?? l???p ??o,...), sau ???? bake v??o model ???? ???????c retopo ????? gi???m l?????i</p>'+
  '        <p>- M???t s??? v???t li???u c?? ????? trong su???t nh?? tr??ng k??nh, l???p m??ng ph??? ngo??i con ng????i,.. s??? d???ng material "Alpha Blend"</p>'+
  '    </div>',
  2: '<div class="info">'+
  '        <h3>Chi???n binh th???i L??</h3>'+
  '        <h4>Tris: 22.603</h4>'+
  '        <h4>Dung l?????ng file: 5.4Mb</h4>'+
  '        <p>M???t s??? k??? thu???t ch??nh:</p>'+
  '        <p>- D???ng model chi ti???t highpoly (c??c h???a ti???t gi??p vai, c??c m??c x??ch g??? tr??n v???t ??o, ????? s???n s??i tr??n da,...)</p>'+
  '        <p>- Retopo ????? gi???m l?????i</p>'+
  '        <p>- Bake d??? li???u t??? model highpoly v??o model ???? ???????c retopo (trong ph???n m???m Substance Painter) ????? chuy???n c??c chi ti???t v??o texture</p>'+
  '    </div>',
};
