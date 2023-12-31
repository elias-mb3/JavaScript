// VARIABLES
let game = {
    score: 0,
    pontuation: 5,
    direction: 'right', // up, left, down, right
    speed: 5,
    core: null,
    ground: {
      x: 500,
      y: 500,
    },
    snake: {
      size: 25,
      x: 0,
      y: 0,
    },
    feed: {
      size: 25,
      x: 0,
      y: 0,
    },
  };

  // FUNCTIONS
  const start = () => {
    addFeed();
    game.core = setInterval(() => {
      move();
    }, 50);
  };

  const move = () => {
    const $snake = document.getElementById('snake');
    const x = parseInt($snake.style.left) || 0;
    const y = parseInt($snake.style.top) || 0;

    switch (game.direction) {
      case 'up':
        $snake.style.top = y - game.speed + 'px';
        break;
      case 'right':
        $snake.style.left = x + game.speed + 'px';
        break;
      case 'down':
        $snake.style.top = y + game.speed + 'px';
        break;
      case 'left':
        $snake.style.left = x - game.speed + 'px';
        break;
    }

    // CALLBACKS
    updatePosition('snake', { x, y });
    checkGameOver();
    checkColision();
  };

  const changeSnakeDirection = (direction) => {
    game.direction = direction.replace('Arrow', '').toLowerCase();
  };

  const updatePosition = (key, position) => {
    game[key] = {
      ...game[key],
      ...position,
    };
  };

  const addFeed = () => {
    removeOldFeed();

    const { ground, feed } = game;
    const $gameGround = document.getElementById('game');

    const randomX = Math.ceil(Math.random() * ground.x) - feed.size;
    const randomY = Math.ceil(Math.random() * ground.y) - feed.size;

    const x = randomX < 500 ? randomX : ground.x - feed.size;
    const y = randomY < 500 ? randomX : ground.y - feed.size;

    updatePosition('feed', { x, y });

    const $feed = document.createElement('div');
    $feed.style.width = feed.size + 'px';
    $feed.style.height = feed.size + 'px';
    $feed.style.backgroundColor = 'red';
    $feed.style.position = 'relative';
    $feed.id = 'feed';
    $feed.style.top = y + 'px';
    $feed.style.left = x + 'px';

    $gameGround.append($feed);
  };

  const removeOldFeed = () => {
    const $feed = document.getElementById('feed');
    if ($feed) {
      $feed.remove();
    }
  };

  const updateScore = () => {
    const { score, pontuation } = game;
    const newScore = score + pontuation;

    const $score = document.getElementById('score');
    $score.innerText = `Pontuação: ${newScore}`;

    game.score = newScore;
  };

  const updateSpeed = () => {
    let { speed } = game;
    speed += 1;

    const $speed = document.getElementById('speed');
    $speed.innerText = `Velocidade: ${speed}`;

    game.speed = speed;
  };

  const isCollide = () => {
    const { snake, feed } = game;
    return !(
      snake.y + snake.size < feed.y ||
      snake.y > feed.y + feed.size ||
      snake.x + snake.size < feed.x ||
      snake.x > feed.x + feed.size
    );
  };

  const checkColision = () => {
    if (isCollide()) {
      addFeed();
      updateScore();
      updateSpeed();
    }
  };

  const checkGameOver = () => {
    const { snake, ground, core } = game;
    const minGround = 0;

    if (
      snake.x < minGround ||
      snake.x > ground.x - snake.size ||
      snake.y < minGround ||
      snake.y > ground.y - snake.size
    ) {
      alert('GAME OVER');
      clearInterval(core);
      return false;
    }
  };

  // EVENT LISTENERS
  document.addEventListener('keydown', (event) => {
    changeSnakeDirection(event.key);
  });

  window.addEventListener('load', () => {
    start();
  });