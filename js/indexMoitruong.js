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
  '        <h3>Concept Nhật Bản Lowpoly</h3>'+
  '        <h4>Tris: 58.740</h4>'+
  '        <h4>Dung lượng file: 3.8Mb</h4>'+
  '        <p>Một số kỹ thuật chính:</p>'+
  '        <p>- Harden Edge để tạo hiệu ứng sắc cạnh lowpoly</p>'+
  '        <p>- Đổ màu trực tiếp dựa trên lưới của model</p>'+
  '    </div>',
  1: '<div class="info">'+
  '        <h3>Khu vườn</h3>'+
  '        <h4>Tris: 46.506</h4>'+
  '        <h4>Dung lượng file: 14.3Mb</h4>'+
  '        <p>Texture kiểu vẽ tay</p>'+
  '    </div>',
  2: '<div class="info">'+
  '        <h3>Lều gỗ</h3>'+
  '        <h4>Tris: 94.216</h4>'+
  '        <h4>Dung lượng file: 10.1Mb</h4>'+
  '        <p>Một số kỹ thuật chính:</p>'+
  '        <p>- Sử dụng các hình ảnh chụp từ thực tế làm texture</p>'+
  '        <p>- UV có thể chồng lên nhau (UV-overlapping) để tiện cho việc làm texture</p>'+
  '        <img src="images/content/envi_woodcabin1.jpg"> '+
  '        <img src="images/content/envi_woodcabin2.jpg"> '+
  '        <img src="images/content/envi_woodcabin3.jpg"> '+
  '    </div>',
  11: '<div class="info">'+
  '        <h3>Phù thủy phong cách Lowpoly</h3>'+
  '        <h4>Tris: 3.920</h4>'+
  '        <h4>Dung lượng file: 160kb</h4>'+
  '        <p>Một số kỹ thuật chính:</p>'+
  '        <p>- Đổ màu trực tiếp dựa trên lưới của model</p>'+
  '    </div>',
  12: '<div class="info">'+
  '        <h3>Mèo phong cách Stylized</h3>'+
  '        <h4>Tris: 5.127</h4>'+
  '        <h4>Dung lượng file: 539kb</h4>'+
  '        <p>Một số kỹ thuật chính:</p>'+
  '        <p>- Sử dụng 1 material với color map (màu sắc) và roughness map (tăng độ bóng cho mắt)</p>'+
  '        <img src="images/content/creature_cat1.jpg"> '+
  '        <img src="images/content/creature_cat2.jpg"> '+
  '    </div>',
  13: '<div class="info">'+
  '        <h3>Ốc sên</h3>'+
  '        <h4>Tris: 2.694</h4>'+
  '        <h4>Dung lượng file: 3.5Mb</h4>'+
  '        <p>Một số kỹ thuật chính:</p>'+
  '        <p>- Dựng model chi tiết highpoly (đầy đủ các nếp nhăn trên vỏ, vết sần sùi trên thân,...)</p>'+
  '        <p>- Retopo để giảm lưới</p>'+
  '        <p>- Bake dữ liệu từ model highpoly vào model đã được retopo (trong phần mềm Substance Painter) để chuyển các chi tiết vào texture</p>'+
  '        <img src="images/content/creature_ocsen1.JPG"> '+
  '    </div>',
  14: '<div class="info">'+
  '        <h3>Thánh gióng Hand-painted</h3>'+
  '        <h4>Tris: 5.410</h4>'+
  '        <h4>Dung lượng file: 603kb</h4>'+
  '        <p>Một số kỹ thuật chính:</p>'+
  '        <p>- Texture kiểu vẽ tay</p>'+
  '        <img src="images/content/char_thanhgiong1.jpg"> '+
  '        <img src="images/content/char_thanhgiong2.jpg"> '+
  '    </div>',
  15: '<div class="info">'+
  '        <h3>Giáo viên phong cách Stylized</h3>'+
  '        <h4>Tris: 11.316</h4>'+
  '        <h4>Dung lượng file: 3Mb</h4>'+
  '        <p>- Dựng model chi tiết highpoly (các nếp và lớp áo,...), sau đó bake vào model đã được retopo để giảm lưới</p>'+
  '        <p>- Một số vật liệu có độ trong suốt như tròng kính, lớp màng phủ ngoài con ngươi,.. sử dụng material "Alpha Blend"</p>'+
  '    </div>',
  16: '<div class="info">'+
  '        <h3>Chiến binh thời Lý</h3>'+
  '        <h4>Tris: 22.603</h4>'+
  '        <h4>Dung lượng file: 5.4Mb</h4>'+
  '        <p>Một số kỹ thuật chính:</p>'+
  '        <p>- Dựng model chi tiết highpoly (các họa tiết giáp vai, các móc xích gỗ trên vạt áo, độ sần sùi trên da,...)</p>'+
  '        <p>- Retopo để giảm lưới</p>'+
  '        <p>- Bake dữ liệu từ model highpoly vào model đã được retopo (trong phần mềm Substance Painter) để chuyển các chi tiết vào texture</p>'+
  '    </div>',
};
