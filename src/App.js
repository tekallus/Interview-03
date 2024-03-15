import axios from "axios"; // Axios kütüphanesini içe aktarıyoruz
import { useEffect, useState } from "react"; // React kütüphanesinden useEffect ve useState hook'larını içe aktarıyoruz
import "./styles.css"; // Stil dosyasını içe aktarıyoruz

function App() {
  return <GenerateList />; // App bileşenimiz, GenerateList bileşenini döndürüyor
}

const GenerateList = () => {
  const [activityList, setActivityList] = useState([]); // activityList adında bir state ve onu güncellemek için setActivityList fonksiyonunu tanımlıyoruz

  useEffect(() => {
    fetchActivity(); // İlk render'da fetchActivity fonksiyonunu çağırıyoruz
  }, []); // useEffect hook'unu bir kere çalıştırmak için boş bir bağımlılık dizisi kullanıyoruz

  
    // Yeni aktiviteyi almak için API'ye istek gönderen fonksiyon
    //axios kütüphanesini kullanarak bir HTTP GET isteği gönderiyor.
    // bu once "npm install axios"  yapmaliyiz
    //Axios'u kullanarak bir API isteği yapmak için
    //axios.get('https://www.example.com/api/data')
    //.then((response) => {
    // console.log(response.data);})
    // .catch((error) => {
    //  console.error('Error fetching data: ', error);});


    const fetchActivity = () => {
    axios
      .get("https://www.boredapi.com/api/activity") // Bored API'den bir aktivite almak için GET isteği gönderiyoruz
      .then((response) => {
        const newActivity = response.data; // API'den gelen veriyi alıyoruz
        setActivityList((prevList) => [...prevList, newActivity]); // Alınan aktiviteyi activityList state'ine ekliyoruz
      })
      .catch((error) => {
        console.error("Error fetching activity: ", error); // Hata olması durumunda konsola bir hata mesajı yazdırıyoruz
      });
  };
//tailwindcss sınıflarını kullanarak buton ve diğer öğelerin stillerini tanımlandi.
// Örneğin, bg-blue-500 sınıfı butonun arka plan rengini belirtirken, text-white sınıfı butonun metin rengini belirtir. 
  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={fetchActivity} 
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Generate Activity
      </button>
      {activityList.map((activity, index) => (
        <ExpandableListItem key={index} item={activity} />
      ))}
    </div>
  );
};

const ExpandableListItem = ({ item }) => {
  // Genişletilebilir liste öğesi bileşeni
  const [expanded, setExpanded] = useState(false); // expanded adında bir state ve onu güncellemek için setExpanded fonksiyonunu tanımlıyoruz

  const handleClick = () => {
    // Öğe tıklandığında gerçekleşecek olay
    setExpanded(!expanded); // expanded state'ini tersine çeviriyoruz
  };

  return (
    <div className="mb-2 w-72">
      <div 
        onClick={handleClick} 
        className="bg-gray-200 cursor-pointer p-2 rounded-md"
      >
        {item.activity}
      </div>
      {expanded && (
        // Eğer expanded true ise, detayları göster
        <div className="bg-gray-100 p-2 rounded-md">
          <p>Type: {item.type}</p> {/* Aktivite türü */}
          <p>Participants: {item.participants}</p> {/* Aktiviteye katılımcı sayısı */}
          <p>Price: {item.price}</p> {/* Aktivitenin maliyeti */}
          <p>Accessibility: {item.accessibility}</p> {/* Aktivitenin erişilebilirlik düzeyi */}
        </div>
      )}
    </div>
  );
};

export default App; // App bileşenini dışa aktarıyoruz
