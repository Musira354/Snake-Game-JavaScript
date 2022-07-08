document.addEventListener('DOMContentLoaded', () => {
    console.log(' in start Game');

    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10;
    let currentIndex = 0;
    let appleIndex = 0;
    let currentSnake = [2, 1, 0];

    let direction = 1;
    let score = 0
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    //to start and restart game
    function startGame() {
        console.log(' in start Game ss');
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval);
        score = 0;

        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        currentSnake.forEach(index => squares[index].classList.add('roundBorders'))

        interval = setInterval(moveOutcomes, intervalTime);
    }
    
    function control(e) {
        squares[currentIndex].classList.remove('snake')
        squares[currentIndex].classList.remove('rotate')

        if (e.keyCode === 39) {
            direction = 1; //if  we press the right arrow on our keyboard 
        } else if (e.keyCode === 38) {
            direction = -width; //if we press
        } else if (e.keyCode === 37) {
            direction = - 1 // if we press left , the snake  will go left 
        } else if (e.keyCode === 40) {
            direction = +width //if we press down , the snake head will instantly ap
            squares[currentSnake[0]].classList.add('rotate') //removes class of snake from the tail
        }
    }

    //genreate new apple once apple is eaten
    function randomApple() {
        console.log('in random apple')
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
            appleIndex = appleIndex % 100;
        } while (squares[appleIndex].classList.contains('snake')) //making sure app
        squares[appleIndex].classList.add('apple')
        squares[appleIndex].classList.remove('rotate')

    }



    //function that deals with all the ove outcomes of the Snakes
    function moveOutcomes(){
        //deals with snakes hitting border and snake hitting self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) ||
            (currentSnake[0] % width === width - 1 && direction === 1) || //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || //if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake')
        ) {
            alert('Game Over! ');
            return clearInterval(interval) //this will clear the interval if any of the above happen
              
        }
        
        const tail = currentSnake.pop() //removes last item of the array
        squares[tail].classList.remove('snake') //removes class of snake from the tail
        currentSnake.unshift(currentSnake[0] + direction) //direction direction to the 
        
        //deals with snake getting apple 
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval= setInterval(moveOutcomes, intervalTime)
        } 
        squares[currentSnake[0]].classList.add('snake')
        squares[currentSnake[0]].classList.add('roundBorders')

    }

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame)

})


