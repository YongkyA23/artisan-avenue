var $slider = $(".carousel");

var $sliderContainer = $(".carousel-container");
var $slides = $(".carousel-image");

//variabel pembantu
var $slideWidth = $slides.width();

var $slideHeight = $slides.height();

var $slideCount = $slides.length;

var $slideIndex = 0;

var $totalWidth = $slideCount * $slideWidth;

//mengatur ukuran slider

$slider.css({ width: $slideWidth, height: $slideHeight });

// mengatur ukuran container
$sliderContainer.css({
  width: $totalWidth,
  height: $slideHeight,
  marginLeft: -$slideWidth,
});

//mengatur ukuran slide

$slides.css({ width: $slideWidth, height: $slideHeight });

//mengatur ukuran total width

// $sliderContainer.css({ width: $totalWidth });

//fungsi untuk mengatur slide

function goToSlide(index) {
  if (index < 0) {
    index = $slideCount - 1;
  } else if (index >= $slideCount) {
    index = 0;
  }

  $sliderContainer.css({ marginLeft: index * -$slideWidth });

  $slideIndex = index;
}

$("#left-arrow").click(function () {
  $sliderContainer.animate(
    {
      left: +$slideWidth,
    },
    "slow",
    () => {
      $(".carousel-image:last-child").prependTo(".carousel-image-container");
      $sliderContainer.css("left", "");
    }
  );
});

$("#right-arrow").click(function () {
  $sliderContainer.animate(
    {
      left: -$slideWidth,
    },
    "slow",
    () => {
      $(".carousel-image:first-child").appendTo(".carousel-image-container");
      $sliderContainer.css("left", "");
    }
  );
});
