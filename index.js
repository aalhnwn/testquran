// indxe.html استدعاء العناصر من
const span = document.querySelectorAll(".random button span");
const button = document.querySelectorAll(".random button");
const text2 = document.querySelector(".text2 p");
const names = document.querySelectorAll(".name");
const suras = document.getElementById("suras");
let index = localStorage.getItem("index");

suras.value = index;

suras.addEventListener("change",function(){
    localStorage.setItem("index",this.value);
    location.reload();
});

// تقطيع الايات و وضعها في مصفوفات
let textAya = data[index].surah.replace(/[\)0-9]/g, "");
let arryAya = textAya.split(/[\(]/);
arryAya.splice(arryAya['length'] - 1, 1);
// وضع اسم السورة
let nameAya = data[index].name;
names[0].innerHTML = nameAya;
// names[1].innerHTML = nameAya;

// تحميل الاصوات
let audioTrue = new Audio("true.mp3");
function slec() {
    // الحصول على 4 ايات عشوائية و وضعها في مصفوفة
    let randomAyaArry = [];
    let activ = 1;
    while (activ < 5) {
        let index = nuberRandom(arryAya.length - 1) + 1;
        if (!randomAyaArry.includes(index)) {
            randomAyaArry.push(index)
            activ++;
        }
    }
    // اختيار اياة عشوائية
    let index = nuberRandom(randomAyaArry.length)
    let aya = arryAya[randomAyaArry[index] - 1];

    text2.innerHTML = aya;// text2 وضع الاية في العنصر 
    // وظع ارقام الايات في الازرار
    span.forEach((e, x) => {
        e.innerHTML = randomAyaArry[x];
        e.dataset.index = randomAyaArry[x];
    })
    indexs = Number(randomAyaArry[index]);
    return
}
// اعادة رقم عشوائي
function nuberRandom(e) {
    return Math.floor(Math.random() * e)
}
let indexs ;
slec();
button.forEach((e, i) => {
    e.addEventListener("click", () => {
        let parent = e.parentElement;
        let indexSpan = Number(span[i].dataset.index);
        if (indexSpan == indexs) {
            animtionTrue(parent);
            setTimeout(() => {
                audioTrue.play();
        }, 600)
        } else {
            const parint = e.parentElement;
            parint.classList.add("anim");
            parint.addEventListener("animationend",()=>{
                parint.classList.remove("anim");
            });
        }
        setTimeout(() => {
            slec();
            const svg = document.querySelector("svg")
                if (svg) {
                    svg.remove()
                }
        }, 1200);

    })
});
function animtionTrue(e) {
    lottie.loadAnimation({
        container: e,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'wired-outline-37-approve-checked-simple-hover-wobble.json'
    });
}