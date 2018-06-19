function openCanvas(){
    document.querySelector('.offcanvas-btn').classList.toggle('offcanvas-btn-open');
    document.querySelector('.offcanvas-aside').classList.toggle('offcanvas-aside-open');
    document.querySelector('.freeze').classList.toggle('freeze-active');    
    document.querySelector('body').classList.toggle('no-scroll');    
}