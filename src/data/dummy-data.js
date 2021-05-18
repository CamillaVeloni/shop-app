import Product from '../models/Product';

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Camisa vermelha',
    'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
    'Uma camisa na cor vermelha, usada umas 3 vezes!',
    29.99
  ),
  new Product(
    'p2',
    'u1',
    'Tapete Azul',
    'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'Tapete de construção super leve com superfície flannel de toque macio e base antiderrapante.',
    99.99
  ),
  new Product(
    'p3',
    'u2',
    'Caneca de café',
    'https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg',
    'Também pode ser usado para tomar chá!',
    8.99
  ),
  new Product(
    'p4',
    'u3',
    'The Book - Edição Limitada',
    'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
    "Um livro",
    15.99
  ),
  new Product(
    'p5',
    'u3',
    'PowerBook',
    'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
    'Computador novissimo! Só tem um arranhão na lateral e não funciona mais a webcam',
    2299.99
  ),
  new Product(
    'p6',
    'u1',
    'Papel',
    'https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg',
    "Papel A4",
    5.49
  )
];

export default PRODUCTS;
