const cars = [
  {
    id: "c1",
    brand: "Toyota",
    title: "Corolla",
    model: "XLE",
    year: 2022,
    price: 5749000,
    image:
      "https://toyota.scene7.com/is/image/toyota/COR_MY21_0002_V001-1?fmt=jpeg&fit=crop&qlt=90&wid=1500",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    specs: [
      "LED Headlights",
      "Adaptive Front-Lighting System (AFS)",
      "Black front grille with sport mesh insert",
      "Color-keyed power outside mirrors",
      "Air conditioning with dust and pollen filter",
      "Automatic engine shutoff",
      "Premium fabric-trimmed 6-way adjustable driver's seat and 4-way adjustable front passenger seat",
      "Toyota Safety Sense",
      "Ten Air Bags",
      "Star Safety System",
      "Child-protector rear door locks",
    ],
    gallery: [
      "https://toyota.scene7.com/is/image/toyota/COR_MY21_0016_V01?wid=2000&fmt=jpg&fit=crop",
      "https://toyota.scene7.com/is/image/toyota/COH_MY22_0004_V001-1?wid=2000&fmt=jpg&fit=crop",
      "https://toyota.scene7.com/is/image/toyota/COR_MY22_0004_V001-1?wid=2000&fmt=jpg&fit=crop",
      "https://toyota.scene7.com/is/image/toyota/COR_MY21_0154_V001-2?wid=2000&fmt=jpg&fit=crop",
      "https://toyota.scene7.com/is/image/toyota/COH_MY22_0002_V001-1?wid=2000&fmt=jpg&fit=crop",
    ],
  },
  {
    id: "c2",
    brand: "Toyota",
    title: "Corolla",
    model: "Hybrid LE",
    year: 2022,
    price: 6350000,
    image:
      "https://toyota.scene7.com/is/image/toyota/COR_MY21_0015_V001-1?fmt=jpeg&fit=crop&qlt=90&wid=1500",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    specs: [
      "LED Headlights",
      "Adaptive Front-Lighting System (AFS)",
      "Black front grille with sport mesh insert",
      "Color-keyed power outside mirrors",
      "Air conditioning with dust and pollen filter",
      "Automatic engine shutoff",
      "Premium fabric-trimmed 6-way adjustable driver's seat and 4-way adjustable front passenger seat",
      "Toyota Safety Sense",
      "Ten Air Bags",
      "Star Safety System",
      "Child-protector rear door locks",
    ],
    gallery: [
      "https://toyota.scene7.com/is/image/toyota/COR_MY21_0016_V01?wid=2000&fmt=jpg&fit=crop",
      "https://toyota.scene7.com/is/image/toyota/COH_MY22_0004_V001-1?wid=2000&fmt=jpg&fit=crop",
      "https://toyota.scene7.com/is/image/toyota/COR_MY22_0004_V001-1?wid=2000&fmt=jpg&fit=crop",
      "https://toyota.scene7.com/is/image/toyota/COR_MY21_0154_V001-2?wid=2000&fmt=jpg&fit=crop",
      "https://toyota.scene7.com/is/image/toyota/COH_MY22_0002_V001-1?wid=2000&fmt=jpg&fit=crop",
    ],
  },
  {
    id: "c3",
    brand: "Honda",
    title: "City",
    model: "Aspire 1.5LAS",
    year: 2022,
    price: 3769000,
    image:
      "https://honda.com.pk/images/landingimages/images/city/cityaspire.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    specs: [
      "Water Cooled 4 Stroke, SOHC i-VTEC, 16 valves 4-cylinder",
      "88(118) / 6,600 Maximum Horse Power (KW(HP)/rpm)",
      "5 Speed Forward & 1 Reverse, Continuously Variable Transmission (CVT) with Earth Dreams Technology",
      "Electronic Power Steering (EPS)",
      "15 X 5.5 J Diamond Cut & Coated Alloy Wheels",
      "Premium Dual-Barrel Halogen Headlights",
      "Driver + Front Passenger Dual SRS Airbags",
      "5 Seat Belts",
    ],
    gallery: [
      "https://honda.com.pk/images/2021/07/5-11-200x112.jpg",
      "https://honda.com.pk/images/2021/07/Honda_City21_Car-02--200x112.jpg",
      "https://honda.com.pk/images/2021/07/ISOFIX-Child-Seat-Support-1-3-1-200x112.jpg",
      "https://honda.com.pk/images/2021/07/9inchinfotainment-750x420.jpg",
      "https://honda.com.pk/images/2021/07/Dual-SRS-Air-Bags-3-1-200x112.jpg",
    ],
  },
  {
    id: "c4",
    brand: "Honda",
    title: "Civic",
    model: "Oriel 1.5 Trubo",
    year: 2022,
    price: 4920350,
    image: "https://honda.com.pk/images/2022/03/8-scaled.jpg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    specs: [
      "Water Cooled 4 Stroke, SOHC i-VTEC, 16 valves 4-cylinder",
      "88(118) / 6,600 Maximum Horse Power (KW(HP)/rpm)",
      "5 Speed Forward & 1 Reverse, Continuously Variable Transmission (CVT) with Earth Dreams Technology",
      "Electronic Power Steering (EPS)",
      "15 X 5.5 J Diamond Cut & Coated Alloy Wheels",
      "Premium Dual-Barrel Halogen Headlights",
      "Driver + Front Passenger Dual SRS Airbags",
      "5 Seat Belts",
    ],
    gallery: [
      "https://honda.com.pk/images/2021/07/5-11-200x112.jpg",
      "https://honda.com.pk/images/2021/07/Honda_City21_Car-02--200x112.jpg",
      "https://honda.com.pk/images/2021/07/ISOFIX-Child-Seat-Support-1-3-1-200x112.jpg",
      "https://honda.com.pk/images/2021/07/9inchinfotainment-750x420.jpg",
      "https://honda.com.pk/images/2021/07/Dual-SRS-Air-Bags-3-1-200x112.jpg",
    ],
  },
  {
    id: "c5",
    brand: "Suzuki",
    title: "Bolan",
    model: "",
    year: 2022,
    price: 1500000,
    image: "https://www.brandsynario.com/wp-content/uploads/2022/02/suzuki.jpg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    specs: [
      "The exterior of the Suzuki Bolan is a fairly boxy design.",
      "The flat front fascia features square headlights with a rectangular styled black grille and rectangular fog lights integrated into the black bumper.",
      "The rear end of the Bolan features rectangular stacked taillights with a black bumper.",
      "The overall exterior of the Bolan is very tall, square and fairly van like",
    ],
    gallery: [
      "https://cache2.pakwheels.com/system/car_generation_pictures/3864/original/side_view...jpg?1451547322",
      "https://www.suzukipremier.com/wp-content/uploads/2021/10/suzuki-bolan6.jpg",
      "https://www.blizin.com/public/images/uploads/vehicle/suzuki-bolan-20201632821162.webp",
    ],
  },
  {
    id: "c6",
    brand: "Suzuki",
    title: "Alto",
    model: "",
    year: 2022,
    price: 2223000,
    image:
      "https://www.globalsuzuki.com/automobile/lineup/alto/img/slide/key_img05.jpg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    specs: [
      "The aerodynamic design with unique lines and curves gives a young and vibrant look.",
      "While the headlamps in a bold design instantly grab your attention.",
      "The aesthetically designed door panels and irresistible stylish back accentuated the richness of the sharp design as well as give the car a lively appearance.",
    ],
    gallery: [
      "https://www.globalsuzuki.com/automobile/lineup/alto/img/slide/key_img01.jpg",
      "http://vehiclebaba.com/img/suzuki-Alto.jpg",
      "https://autos.hamariweb.com//images/carimages/car_2133_216079.jpg",
    ],
  },
];

export default cars;