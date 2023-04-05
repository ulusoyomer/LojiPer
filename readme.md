# Lojiper Back-End Test Projesi

## Kurulum Adımları

1. Minimum Node.js sürümü `16.15.0` ve npm sürümü `8.5.5` olarak kurulu olmalıdır.
2. `.env` dosyası oluşturulmalıdır. `.env.example` dosyasından yararlanarak oluşturulabilir.
3. `.env` dosyasının içerisinde MongoDB bağlantı URL'si `MONGO_URI` ve token oluşturulabilmesi için `JWT_SECRET` alanları girilmelidir.
4. Projeklasörü içinde terminal ekranında `npm i` komutu çalıştırılmalıdır. Bu komut projenin ihtiyaç duyduğu paketleri indirecektir.
5. Paketler indirildikten sonra terminal ekranında `npm run seed` komutu çalıştırılmalıdır. Bu komut veritabanına gerekli olan verileri ekleyecektir.
6. Bu adımların tamamı başarıyla tamamlandıktan sonra terminal ekranına `npm run dev` komutu girilerek projeyi çalıştırabilirsiniz.

## Özellikler

## Kayıt Olma - Giriş Yapma

-  Uygulamada işlemlerin yapılabilmesi için kullanıcı girişi yapılması zorunludur.
-  Giriş yapıldıktan sonra `lojiper_token` isminde bir cookie oluşturulur ve içine jsonwebtoken verisi yerleştirilir.
-  Bir middleware ile cookie kontrol edilir ve kullanıcının giriş yapıp yapmadığı anlaşılır.
-  Kayıt olunduktan sonra cookie oluşturulur tekrar giriş yapılmasına gerek yoktur.

### Kayıt olma

http://localhost:3000/api/v1/auth/register -- **POST** isteği ile kayıt olabilirsiniz.

### Örnek JSON formatında kayıt oluşturulması için gereken veriler

Aşağıdaki örnek json formatında verileri göndererek kayıt oluşturabilirsiniz. Tüm veriler zorunludur.

```json
{
	"name": "ömer",
	"lastName": "ulusoy",
	"gender": "Male",
	"phone": "05333333333",
	"email": "test@test.com",
	"password": "secret123",
	"passwordConfirmation": "secret123",
	"age": "25"
}
```

Bu işlem sonucu eğer validation hatası var ise json formatında `message` alanın içerisnde hata mesajı dönecektir. <br>
İşlem başarılı ise oluşturulan kullanıcı bilgileri json formatında `201` durum kodu ile geri dönecektir.

### Giriş Yapma

http://localhost:3000/api/v1/auth/login -- **POST** isteği ile giriş yapabilirsiniz.

### Örnek JSON formatında giriş yapılabilmesi için gereken veriler

```json
{
	"email": "test@test.com",
	"password": "secret123"
}
```

Bu işlem sonucu eğer validation hatası veya kimlik bilgileri doğrulanmaz ise json formatında `message` alanın içerisnde hata mesajı dönecektir. <br>
İşlem başarılı ise oluşturulan kullanıcı bilgileri json formatında `200` durum kodu ile geri dönecektir.

### Seferleri Listeleme

Bu belgedeki bilgilere göre, http://localhost:3000/api/v1/buses endpoint'inde GET isteği yaparak tüm seferleri listeleyebilirsiniz. Seferler kalkış saatine göre sıralanmış olarak gelir.

Ayrıca, http://localhost:3000/api/v1/buses/istanbul endpoint'inde GET isteği yaparak sadece İstanbul'dan kalkan seferleri listeleyebilirsiniz. Bu seferler de kalkış saatine göre sıralanmış olarak gelir.

Son olarak, http://localhost:3000/api/v1/buses/istanbul/ankara endpoint'inde GET isteği yaparak sadece İstanbul'dan kalkan ve Ankara'ya varan seferleri listeleyebilirsiniz. Bu seferler de kalkış saatine göre sıralanmış olarak gelir.

Eğer bir seferin detaylarını görmek isterseniz, http://localhost:3000/api/v1/buses/:from/schedule/:bus_id endpoint'ine GET isteği yapabilirsiniz. Bu istek, seferin koltuk bilgisi gibi detaylı bilgilerini listeler. bus_id kısmına, veri tabanında busservices koleksiyonunun altında bulunan seferlerin \_id verisi, from kısmına ise seferin kalktığı şehrin adı yazılması gerekir.

Diğer sefer endpointlerinin döndürdüğü veriler aynı formatta ve JSON formatındadır, sadece sefer detayı endpointi farklıdır.

### Örnek JSON formatında bulunan tüm seferler

```json
{
	"busServices": [
		{
			"_id": "642c17c2fc13ae3ec4f4d62b",
			"company_name": "Schowalter Group",
			"price": 237.16,
			"start_time": "2:41",
			"end_time": "15:25",
			"from": "istanbul",
			"to": "van"
		},
		{
			"_id": "642c17c2fc13ae3ec4f4d62e",
			"company_name": "Schoen, Rosenbaum and Parisian",
			"price": 286.82,
			"start_time": "2:43",
			"end_time": "14:00",
			"from": "ankara",
			"to": "trabzon"
		},
		{
			"_id": "642c17c2fc13ae3ec4f4d62d",
			"company_name": "Mayert, Halvorson and Streich",
			"price": 238.97,
			"start_time": "3:14",
			"end_time": "15:38",
			"from": "ankara",
			"to": "izmir"
		},
		{
			"_id": "642c17c2fc13ae3ec4f4d62c",
			"company_name": "Predovic, Gibson and Tillman",
			"price": 49.57,
			"start_time": "3:49",
			"end_time": "14:39",
			"from": "istanbul",
			"to": "ankara"
		}
	]
}
```

### Örnek JSON formatında bulunan sefer detay

http://localhost:3000/api/v1/buses/istanbul/schedule/642c17c2fc13ae3ec4f4d62b

```json
{
	"busService": [
		{
			"_id": "642c17c2fc13ae3ec4f4d62b",
			"company_name": "Schowalter Group",
			"price": 237.16,
			"start_time": "2:41",
			"end_time": "15:25",
			"from": "istanbul",
			"to": "van",
			"total_seats": 30,
			"seats": [
				{
					"name": "Dewie",
					"gender": "Male",
					"seat_number": 1,
					"_id": "642cb95d9410c06df199e22f"
				},
				{
					"name": "Ayşe",
					"gender": "Female",
					"seat_number": 3,
					"_id": "642cb95d9410c06df199e230"
				},
				{
					"name": "Murat",
					"gender": "Male",
					"seat_number": 7,
					"_id": "642cb95d9410c06df199e231"
				},
				{
					"name": "Arzu",
					"gender": "Female",
					"seat_number": 5,
					"_id": "642cb95d9410c06df199e232"
				},
				{
					"name": "Hasan",
					"gender": "Male",
					"seat_number": 9,
					"_id": "642cb95d9410c06df199e233"
				}
			],
			"__v": 0
		}
	]
}
```

### Bilet alma

http://localhost:3000/api/v1/buy/:bus_id <br>

Bu endpoint ile kullanıcılar belirtilen sefere ait bir veya birden fazla koltuk satın alabilirler. İstek adresinde :bus_id parametresi kullanılmalıdır ve bu parametre, veri tabanında busservices koleksiyonu altında bulunan seferlerin \_id değerini almalıdır.<br>

Örnek bir istek şu şekilde olabilir: POST http://localhost:3000/api/v1/buy/60fc828557c0e30b2d200c92

İstek gövdesinde, "seats" anahtarının altında bir dizi koltuk nesnesi belirtilmelidir. Her bir koltuk nesnesi, "name", "gender" ve "seat_number" özelliklerine sahip olmalıdır.

### Örnek JSON formatında bilet alınması için gönderilen veriler

```json
{
	"seats": [
		{
			"name": "Test2",
			"gender": "Male",
			"seat_number": "8"
		},
		{
			"name": "Test1",
			"gender": "Male",
			"seat_number": "2"
		},
		{
			"name": "Test1",
			"gender": "Female",
			"seat_number": "4"
		}
	]
}
```

Eğer bilet alma işlemi başarılı bir şekilde tamamlanırsa, bilet objesi döndürülür. Bu obje, biletin temel bilgilerini içerir.

Eğer bilet alma işlemi başarısız olursa, hata mesajı döndürülür. Bu hata mesajı, bilet alırken oluşan hataları içerir.

### Bilet Detayının Görüntülenmesi

Biletin detaylı bilgileri için, http://localhost:3000/api/v1/profile/tickets/:ticket_id endpoint'ine GET isteği yapılabilir. ticket_id kısmına, veritabanında tickets koleksiyonunun altında bulunan biletlerin \_id verisi yazılmalıdır.

### Örnek JSON formatında bilet detayı:

```json
{
	"seats": [
		{
			"seat_number": 8,
			"name": "Test2",
			"gender": "Male",
			"_id": "642d828b0ffd0b3221135b32"
		},
		{
			"seat_number": 2,
			"name": "Test1",
			"gender": "Male",
			"_id": "642d828b0ffd0b3221135b33"
		},
		{
			"seat_number": 4,
			"name": "Test1",
			"gender": "Female",
			"_id": "642d828b0ffd0b3221135b34"
		}
	],
	"bus": {
		"_id": "642c17c2fc13ae3ec4f4d62b",
		"company_name": "Schowalter Group",
		"from": "istanbul",
		"to": "van",
		"total_seats": 30
	}
}
```

Bu örnek JSON formatındaki veri, bilet sahibinin aldığı koltuk numaraları ve sefer bilgilerini içermektedir.

### Örnek Biletlerin Listelenmesi

Kullanıcının aldığı tüm biletlerin listelenebilmesi için `http://localhost:3000/api/v1/profile/tickets` endpoint'ine GET isteği gönderilir. Middleware, kullanıcının cookie kısmındaki değeri okur ve kullanıcının aldığı biletler listelenir.

Örnek yanıt JSON formatında aşağıdaki gibidir:

```json
{
	"tickets": [
		{
			"_id": "642d828b0ffd0b3221135b31",
			"bus": {
				"_id": "642c17c2fc13ae3ec4f4d62b",
				"company_name": "Schowalter Group",
				"from": "istanbul",
				"to": "van"
			},
			"createdAt": "2023-04-05T14:15:39.074Z"
		}
	]
}
```

Burada, tickets anahtar kelimesi altında kullanıcının aldığı tüm biletler listelenir. Her bilet, \_id özelliğiyle benzersiz bir kimlik numarasına sahiptir ve bus özelliğiyle biletin satın alındığı otobüs hakkında bilgi verir. createdAt özelliği, biletin oluşturulma tarihini gösterir.

## Hata Mesajları

Hata mesajları, aşağıdaki JSON formatındadır:

```json
{
	"message": "Hata mesajı"
}
```

Hata mesajı anahtar kelimesi altında ilgili hatanın açıklaması yer alır. Tüm hata mesajları aynı formatı kullanır ve uygun HTTP durum koduyla birlikte gönderilir.

Örnek:

```json
{
	"message": "No ticket found"
}
```

Burada, message anahtar kelimesi altında "No ticket found" mesajı yer alır. Bu hata, ilgili bileti bulamama durumunda gönderilir ve HTTP 404 Not Found durum koduyla birlikte gönderilir.
