window.addEventListener("scroll", function () {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var rotatingElement = document.querySelector(".text-path");
  var contactFormWheel = document.querySelector(".contact-form-wheel");
  rotatingElement.style.transform = "rotate(" + scrollTop / 3 + "deg)";
  contactFormWheel.style.transform = "rotate(" + scrollTop / 3 + "deg)";

  var ethics = document.querySelectorAll(".ethics .ethic");

  var observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      var descriptionElement = entry.target.querySelector(".ethic-description");
      var titleElement = entry.target.querySelector(".ethic-title");

      if (descriptionElement && titleElement) {
        if (entry.isIntersecting) {
          descriptionElement.style.left = entry.intersectionRect.y / 2.2 + "px";
          titleElement.style.right = entry.intersectionRect.y / 2.2 + "px";
        }
      }
    });
  });

  ethics.forEach(function (ethic) {
    observer.observe(ethic);
  });
});
