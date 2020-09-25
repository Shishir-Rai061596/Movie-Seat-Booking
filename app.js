const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seats:not(.occupied)');
const count = document.querySelector('#count');
const price = document.querySelector('#price');
const movieSelect = document.querySelector('#movie');

const saveMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

const handleGetData = () => {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeat"));
    if (selectedSeats !== null && selectedSeats.length > 0) {

        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected")
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex
        updateCount();
    }

}

const updateCount = () => {
    const ticketPrice = Number(movieSelect.value);
    const selectedSeats = document.querySelectorAll('.row .seats.selected');

    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem("selectedSeat", JSON.stringify(seatIndex))


    count.textContent = selectedSeats.length;
    price.textContent = selectedSeats.length * ticketPrice;

}

const handleSelectSeat = e => {
    if (e.target.classList.contains('seats') && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        updateCount();
    }
}

const handleMovieChange = e => {
    saveMovieData(e.target.selectedIndex, e.target.value)
    updateCount();
}

container.addEventListener('click', handleSelectSeat)
movieSelect.addEventListener('change', handleMovieChange)

document.addEventListener('DOMContentLoaded', handleGetData)










