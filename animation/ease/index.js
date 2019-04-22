function animate({duration, draw, timing}) {
  
  let start = performance.now();
  
  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }
    
    let progress = timing(timeFraction)
    
    draw(progress);
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
    
  });
}

animate({
  duration: 2000,
  timing: function (timeFraction) {
    return timeFraction * (2 - timeFraction)
  },
  draw: function(progress) {
    window.scrollTo(0, progress * 5000)
  }
});
