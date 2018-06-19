console.log('Starting up');
'use strict;'



function initPage() {
    renderPortfolio()

}


function renderPortfolio() {
    var strHTML = '';
    var projs = getProjsForDisplay();
    projs.forEach(function (proj, idx) {
        strHTML += `
        <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="renderModal(${idx})">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/${proj.id}-thumbnail.jpg" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${proj.title}</h4>
            <p class="text-muted">${proj.desc}</p>
          </div>
        </div>`

    });


    var elPortfolioItems = document.querySelector('.portfolio-items');
    elPortfolioItems.innerHTML = strHTML;


}

function renderModal(idx) {
  var proj = getProjByIdx(idx);
  var elPorjTitle = document.querySelector('.proj-title');
  elPorjTitle.innerText = proj.title;
  var elProjName = document.querySelector('.proj-name')
  elProjName.innerText = proj.name;
  var eliImg = document.querySelector('.modal img');
  eliImg.src = `img/portfolio/${proj.id}-full.jpg`
  var elProjDesc = document.querySelector('.proj-desc')
  elProjDesc.innerText = proj.desc;
}

function sendEmail() {

  var strEmail = document.querySelector('.email-input').value;
  var strSubject = document.querySelector('.subject-input').value;
  var strBody = document.querySelector('.body-input').value;
  location.assign(`https://mail.google.com/mail/?view=cm&fs=1&to=${strEmail}&su=${strSubject}&body=${strBody}`)
}