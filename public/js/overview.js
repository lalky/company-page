function myFunction (x) {
    x.classList.toggle("change");
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
    
    const bars = document.querySelectorAll('.bar1, .bar2, .bar3');
    bars.forEach(bar => {
        bar.classList.toggle("change");
    });
}