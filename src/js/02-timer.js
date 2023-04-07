import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const pickedDate = selectedDates[0];
        const currentDate = new Date();
        const startBtn = document.getElementById("start-btn");

        startBtn.disabled = true;

        if( pickedDate < currentDate){
            Notiflix.Notify.failure("Please choose a date in the future")
        } else{
          startBtn.disabled = false;
        }


        
      console.log(selectedDates[0]);
    },
});



document.getElementById("start-btn").addEventListener("click", event =>{
const date = document.getElementById("datetime-picker").value
event.target.disabled = true
   const intervalId = setInterval(() => {     

        const ms = Date.parse(date) - new Date();
        if (ms < 1000) {
        
        clearInterval(intervalId);
        }
        startTimer(ms)
    }, 1000)
        
} )
 const startTimer = (ms) => {
   
    const {days, hours, minutes, seconds} = convertMs(ms);

    document.getElementById("days-value").innerText = padZero(days);
    document.getElementById("hours-value").innerText = padZero(hours);
    document.getElementById("minutes-value").innerText = padZero(minutes);
    document.getElementById("seconds-value").innerText = padZero(seconds);
}

function convertMs(ms) {
   
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  const padZero = value => value.toString().padStart(2, '0')