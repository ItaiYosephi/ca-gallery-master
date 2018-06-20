function openCanvas(){
    document.querySelector('.offcanvas-btn').classList.toggle('offcanvas-btn-open');
    document.querySelector('.offcanvas-aside').classList.toggle('offcanvas-aside-open');
    document.querySelector('.freeze').classList.toggle('freeze-active');    
    document.querySelector('body').classList.toggle('no-scroll');    
    document.querySelector('.offcanvas-btn .fa').classList.toggle('fa-comment');    
    document.querySelector('.offcanvas-btn .fa').classList.toggle('fa-times');    
}