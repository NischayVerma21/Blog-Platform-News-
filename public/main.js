const images = document.querySelectorAll('.image');

    let index = 0;
    
    setInterval(() => {
      images[index].classList.remove('active');
      index = (index + 1) % images.length;
      images[index].classList.add('active');
    }, 3000); // Change images every 3 seconds (3000ms)
    

    const images1 = document.querySelectorAll('.img');
    let dex = 0;
  
    function changeImage() {
      images1[dex].classList.remove('on');
      const nextIndex = (dex + 1) % images1.length;
      images1[nextIndex].classList.add('on');
      dex = nextIndex;
    }
  
    setInterval(changeImage, 3000); 