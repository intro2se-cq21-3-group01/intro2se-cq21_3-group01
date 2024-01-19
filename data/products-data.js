const products = [
  {
    Name: "Croissant",
    Description:
      "A classic Croissant, a French pastry renowned for its flaky texture and rich taste. Crafted from simple yet premium ingredients like flour, butter, yeast, and a touch of sugar, each bite offers a delightful balance of crispiness and softness.",
    Price: 2.5,
    Categories: "Bread",
    Quantity: 50,
    Image: "https://images.app.goo.gl/miPyzMnXu76PARLS7",
  },
  {
    Name: "Fruit Yogurt Bread",
    Description:
      "Fruit Yogurt Bread, a delightful fusion of moist bread, vibrant fruits, and the creamy richness of yogurt. This delectable treat boasts a medley of flavors, with ingredients including flour, yogurt, fresh fruits, and a touch of sweetness. Perfect for breakfast or a light snack, Fruit Yogurt Bread offers a healthier.",
    Price: 8.0,
    Categories: "Bread",
    Quantity: 50,
    Image: "https://images.app.goo.gl/GZELE4mKwF4wxPgo7",
  },
  {
    Name: "Baumkuchen",
    Description:
      "Baumkuchen is a traditional German cake known for its unique tree-ring-like appearance. This confection has a golden-brown exterior with a tender, moist interior. Ingredients include flour, eggs, butter, sugar, and often almond paste for added richness.",
    Price: 15.0,
    Categories: "Cake",
    Quantity: 50,
    Image: "https://images.app.goo.gl/kzvTpbGSVNHXZkkY9",
  },
  {
    Name: "Strawberry Mousse",
    Description:
      "Strawberry Mousse is a heavenly dessert that combines the velvety smoothness of mousse with the sweet and vibrant essence of fresh strawberries. Crafted with ingredients such as ripe strawberries, cream, sugar, and gelatin, this delectable treat offers a perfect balance of sweetness and creaminess. Topped with a garnish of fresh strawberry slices or a drizzle of strawberry sauce, this dessert is a delightful symphony of flavors and textures.",
    Price: 10.0,
    Categories: "Mousse",
    Quantity: 50,
    Image: "https://images.app.goo.gl/bEpMw1G6P8n6fq9C9",
  },
  {
    Name: "Mango Dark Chocolate Mousse",
    Description:
      "Mango Dark Chocolate Mousse, a sophisticated dessert that harmoniously combines the tropical sweetness of mango with the rich intensity of dark chocolate. This velvety and airy mousse is crafted using high-quality ingredients such as fresh mango puree, premium dark chocolate, cream, and a touch of sugar. The result is a luxurious treat that tantalizes the taste buds.",
    Price: 12.75,
    Categories: "Mousse",
    Quantity: 50,
    Image: "https://images.app.goo.gl/2NYsuF8TcDtwLFVQ7",
  },
  {
    Name: "Egg Tart",
    Description:
      "Egg Tarts, a beloved pastry that boasts a flaky crust embracing a velvety custard filling. The smooth and sweet custard is crafted from simple ingredients like eggs, sugar, and milk, creating a harmonious blend of textures and flavors. With a golden hue and a delectable aroma, Egg Tarts are both visually appealing and irresistibly tasty.",
    Price: 5.0,
    Categories: "Pies, Tarts and Flans",
    Quantity: 50,
    Image: "https://images.app.goo.gl/XAUfC44jxFh7ztc67",
  },
  {
    Name: "Apple cake",
    Description:
      "Apple Cake with tender chunks of apples meld seamlessly with a cinnamon-spiced batter. This delightful dessert boasts a perfect balance of sweetness and tartness, creating a cozy treat reminiscent of fall flavors. Common ingredients include apples, flour, sugar, cinnamon, and eggs",
    Price: 15.0,
    Categories: "Cake",
    Quantity: 52,
    Image: "https://images.app.goo.gl/XTZVRbGR4P78RkvV6",
  },
  {
    Name: "Chocolate cookie",
    Description:
      "Indulge your chocolate cravings with the irresistible Chocolate Cookie. These delectable treats boast a rich cocoa flavor, a chewy texture, and a perfect balance of sweetness. Crafted with classic ingredients such as flour, cocoa powder, butter, sugar, and chocolate chips, these cookies are a true delight for chocolate enthusiasts.",
    Price: 3.0,
    Categories: "Cookie",
    Quantity: 53,
    Image: "https://images.app.goo.gl/zT1PtZE5t7eM56mz8",
  },
  {
    Name: "Donut",
    Description:
      "A classic donut, a beloved treat with a soft and fluffy texture. Made from a simple yet delightful combination of flour, sugar, yeast, and milk, these ring-shaped pastries are often deep-fried to golden perfection. Glazed, frosted, or sprinkled, donuts come in a variety of flavors to suit every palate.",
    Price: 3.0,
    Categories: "Donut",
    Quantity: 55,
    Image: "https://images.app.goo.gl/rgYDZ8PUuPqes1V66",
  },
  {
    Name: "Baguette",
    Description:
      "A classic French Baguette, characterized by its golden-brown crust and soft, airy interior. Crafted with minimal ingredients, the traditional baguette comprises flour, water, yeast, and salt, creating a perfect balance.",
    Price: 2.5,
    Categories: "Bread",
    Quantity: 55,
    Image: "https://images.app.goo.gl/tcu16zFnA7aVDetd6",
  },
  {
    Name: "Pineapple-upside-down cake",
    Description:
      "Savor the nostalgic delight of a Pineapple Upside-Down Cake, a classic dessert that combines moist yellow cake with caramelized pineapple slices and maraschino cherries. The simple yet heavenly treat is made with ingredients like flour, sugar, butter, and pineapple rings. The sweet aroma and visually appealing presentation make it an ideal choice for any occasion.",
    Price: 20.0,
    Categories: "Cake",
    Quantity: 55,
    Image: "https://images.app.goo.gl/oTyM94smMHZe6iT48",
  },
  {
    Name: "Mille crepe",
    Description:
      "Mille Crepes Cake, a French-inspired delicacy featuring layers of paper-thin crepes interwoven with luscious pastry cream. The delicate, melt-in-your-mouth texture is a testament to the meticulous craftsmanship involved. Ingredients include flour, eggs, milk, and sugar, creating a symphony of flavors and textures.",
    Price: 10.0,
    Categories: "Crepe",
    Quantity: 55,
    Image: "https://images.app.goo.gl/ZjGTbo4jnLB4yX1v8",
  },
  {
    Name: "Matcha Cupcake",
    Description:
      "Matcha Cupcakes, a fusion of traditional Japanese matcha tea and sweet decadence. These light and fluffy cupcakes are infused with matcha powder. The ingredients include flour, sugar, matcha powder, butter, eggs, and milk, creating a harmonious blend of flavors. ",
    Price: 3.5,
    Categories: "Cupcake",
    Quantity: 55,
    Image: "https://images.app.goo.gl/Kj6HATe2TCixPcd89",
  },
  {
    Name: "Bacon sandwich",
    Description:
      "Bacon Sandwich, a mouthwatering creation that balances crispy bacon with soft bread for a perfect bite. This classic delight features a combination of quality ingredients such as thick-cut bacon, fresh lettuce, juicy tomatoes, and creamy mayonnaise. The smoky, salty flavors harmonize in a delightful ensemble, making it a popular choice for breakfast or lunch.",
    Price: 15.0,
    Categories: "Sandwich",
    Quantity: 55,
    Image: "https://images.app.goo.gl/JcgZ9KtsapFDFQxE7",
  },
  {
    Name: "Blueberry Tiramisu",
    Description:
      "Experience a delightful twist on the traditional Tiramisu with Blueberry Tiramisu, a luscious dessert that combines layers of velvety and a burst of blueberry goodness. The ingredients include cheese, blueberries, coffee, sugar, and vanilla offering a perfect balance of sweet and tart flavors.",
    Price: 12.0,
    Categories: "Tiramisu",
    Quantity: 58,
    Image: "https://images.app.goo.gl/mCMKc51VaeH2Gg8F6",
  },
  {
    Name: "Choco Tiramisu",
    Description:
      "Choco Tiramisu, a decadent twist on the classic Italian dessert. This delectable treat layers rich chocolate-flavored cream, creating a perfect fusion of velvety textures and intense flavors. The ingredients include cocoa powder, espresso, cheese, sugar, and chocolate shavings.",
    Price: 12.0,
    Categories: "Tiramisu",
    Quantity: 59,
    Image: "https://images.app.goo.gl/9XejJqANnttSJrN37",
  },
  {
    Name: "Banana Bread",
    Description:
      "Banana Bread is a classic baked treat perfect blend of sweetness and nuttiness, with ingredients like ripe bananas, flour, sugar, eggs, and a touch of cinnamon. Whether enjoyed as a breakfast staple or a cozy snack, Banana Bread offers a inviting experience.",
    Price: 7.75,
    Categories: "Bread",
    Quantity: 60,
    Image: "https://images.app.goo.gl/eYmuTN2Q7KFZH8GAA",
  },
  {
    Name: "Cheesecake",
    Description:
      "Cheesecake, a velvety dessert that captivates with its rich texture and delectable flavor. Crafted with a luxurious blend of cream cheese, sugar, and eggs, this classic treat is often enhanced with vanilla extract and a buttery graham cracker crust. Cheesecake adorned with various toppings like fruit compotes or chocolate drizzles, is a versatile and crowd-pleasing dessert. ",
    Price: 30.0,
    Categories: "Cake",
    Quantity: 60,
    Image: "https://images.app.goo.gl/wmXgAGSqEEHktWQd9",
  },
  {
    Name: "Apple pie",
    Description:
      "Apple Pie is a dessert that blends tender, cinnamon-spiced apples with a flaky, golden crust. The ingredients include fresh apples, sugar, cinnamon, and butter, creating a harmonious balance of sweetness and spice.",
    Price: 8,
    Categories: "Pies, Tarts and Flans",
    Quantity: 60,
    Image: "https://images.app.goo.gl/bxnreWzbHJBMRsydA",
  },
  {
    Name: "Chicken sandwich",
    Description:
      "Satisfy your taste buds with a succulent Chicken Sandwich, a culinary delight that balances crispiness and tenderness. This classic sandwich features a seasoned and grilled or fried chicken breast nestled between soft buns, accompanied by fresh lettuce, tomatoes, and mayonnaise. Common ingredients include chicken breast, buns, lettuce, tomatoes, and condiments.",
    Price: 15.0,
    Categories: "Sandwich",
    Quantity: 60,
    Image: "https://images.app.goo.gl/AEZKpEScV1JUFmP57",
  },
  {
    Name: "Sachertorte",
    Description:
      "Sachertorte, a renowned Austrian chocolate cake. This exquisite dessert boasts layers of rich chocolate cake and apricot jam, coated in chocolate. The ingredients include dark chocolate, butter, sugar, eggs, and apricot preserves.",
    Price: 30.0,
    Categories: "Cake",
    Quantity: 62,
    Image: "https://images.app.goo.gl/gxpwavUjkRN2tAqX9",
  },
  {
    Name: "Cherry Cupcake",
    Description:
      "Cherry Cupcakes is a perfect fusion of moist vanilla cake infused with the sweet essence of cherries. These cupcakes boast a luscious cherry-flavored frosting, adorned with a garnish of fresh or candied cherries for an extra burst of flavor. Common ingredients include flour, sugar, butter, eggs, milk, and cherry extract.",
    Price: 3.5,
    Categories: "Cupcake",
    Quantity: 65,
    Image: "https://images.app.goo.gl/h5dWcauBbAc7Zr1r7",
  },
  {
    Name: "Carrot cake",
    Description:
      " Carrot Cake, a dessert that tantalizes the taste buds with a perfect blend of shredded carrots, cinnamon, and nutmeg. The cake is enriched with ingredients like flour, sugar, eggs, and crushed pineapple, creating a flavorfuland textured masterpiece. Topped with smooth cream cheese frosting, this classic treat strikes a balance between sweet and savory.",
    Price: 18.0,
    Categories: "Cake",
    Quantity: 65,
    Image: "https://images.app.goo.gl/WzcEUjSb2Nwouato7",
  },
  {
    Name: "Flan",
    Description:
      "Flan is a luxurious caramel-infused custard dessert with a smooth and creamy texture. This Latin American and Spanish delicacy is crafted from simple yet exquisite ingredients, including eggs, sugar, vanilla, and sweetened condensed milk.",
    Price: 3.0,
    Categories: "Pies, Tarts and Flans",
    Quantity: 70,
    Image: "https://images.app.goo.gl/AVxgTzuTezJdJBJ1A",
  },
  {
    Name: "Breadstick",
    Description:
      "Breadsticks is a perfect combination of a soft interior and a crispy, seasoned exterior. Crafted with common ingredients like flour, yeast, olive oil, and salt, they offer a versatile accompaniment to various meals or a satisfying snack on their own.",
    Price: 2.0,
    Categories: "Bread",
    Quantity: 70,
    Image: "https://images.app.goo.gl/YxCyDUgK2MWUJFFK7",
  },
  {
    Name: "Matcha Muffin",
    Description:
      "Matcha Muffins, a fusion of Japanese green tea and delicate sweetness. These moist and aromatic muffins boast a unique matcha taste. Crafted with high-quality matcha powder, flour, sugar, eggs, and butter, they offer a delightful balance of flavors.",
    Price: 4.5,
    Categories: "Muffind",
    Quantity: 70,
    Image: "https://images.app.goo.gl/WmKPaRYuaf1NwoNu7",
  },
  {
    Name: "Mango Pie",
    Description:
      "Satisfy your taste buds with the tropical allure of Mango Pie, a luscious dessert that captures the essence of ripe mangoes in a flaky crust. The pie is made with a blend of fresh mango slices, sugar, and a hint of citrus for a perfect balance of sweetness.",
    Price: 4.0,
    Categories: "Pies, Tarts and Flans",
    Quantity: 70,
    Image: "https://images.app.goo.gl/MPCNPEjHExbGi5B26",
  },
  {
    Name: "Strawberry Swiss Roll",
    Description:
      "Strawberry Swiss Roll, a delightful confection that combines fluffy sponge cake with a luscious strawberry filling. The cake is rolled to perfection, creating a visually appealing spiral of sweetness. Main ingredients include flour, eggs, sugar, fresh strawberries, and a touch of cream.",
    Price: 10.0,
    Categories: "Swiss Roll",
    Quantity: 70,
    Image: "https://images.app.goo.gl/G4qS1C7x432Qrxi7A",
  },
  {
    Name: "Vanilla Cookie",
    Description:
      "Vanilla Cookies crafted with basic pantry staples like flour, sugar, butter, and vanilla extract, these cookies offer a melt-in-your-mouth experience with every bite. The subtle sweetness and delicate flavor make them a delight for any occasion.",
    Price: 3.0,
    Categories: "Cookie",
    Quantity: 72,
    Image: "https://images.app.goo.gl/pMyVv1FL8pLxEtqg7",
  },
  {
    Name: "Vanilla Swiss Roll",
    Description:
      "Vanilla Swiss Roll is a classic dessert that embodies simplicity and elegance. This delectable treat features a thin layer of sponge cake rolled around a luscious vanilla-flavored cream filling. Common ingredients include flour, sugar, eggs, vanilla extract, and whipping cream.",
    Price: 10.0,
    Categories: "Swiss Roll",
    Quantity: 72,
    Image: "https://images.app.goo.gl/9taj4c789KtjK9FRA",
  },
  {
    Name: "Chiffon cake",
    Description:
      "Chiffon Cake. This delicate cake has a fluffy texture and a subtle blend of vanilla and citrus flavors. Key ingredients include flour, sugar, vegetable oil, eggs, and baking powder.",
    Price: 25.0,
    Categories: "Cake",
    Quantity: 80,
    Image: "https://images.app.goo.gl/28jLGtjxs2bccAaw5",
  },
  {
    Name: "Chocolate Muffin",
    Description:
      "Chocolate Muffins have a rich cocoa flavor, enhanced by a generous amount of chocolate chips for a delightful burst of sweetness in every bite. The key ingredients include flour, cocoa powder, sugar, eggs, butter, and chocolate chips. ",
    Price: 4.5,
    Categories: "Muffin",
    Quantity: 80,
    Image: "https://images.app.goo.gl/MSoCQnqtzP72Wkru9",
  },
  {
    Name: "Strawberry Muffin",
    Description:
      "Strawberry Muffin, a moist and fluffy treat infused with the sweet essence of ripe strawberries. Crafted with a blend of flour, sugar, eggs, and fresh strawberries, these muffins offer a burst of fruity goodness in every bite. Topped with a light crumble or glaze, they strike the perfect balance between sweetness and texture. ",
    Price: 5.0,
    Categories: "Muffin",
    Quantity: 80,
    Image: "https://images.app.goo.gl/GgkbPXhtmSc4tZz9A",
  },
  {
    Name: "Coffee Cupcake",
    Description:
      "Coffee Cupcakes combines the bold flavor of coffee with a moist and tender cupcake base. These miniature delights feature a coffee-infused batter, creating a perfect balance of sweetness and caffeine kick. Ingredients include flour, sugar, butter, eggs, and coffee.",
    Price: 3.5,
    Categories: "Cupcake",
    Quantity: 92,
    Image: "https://images.app.goo.gl/Bc6R78tptMBGa1sq8",
  },
  {
    Name: "Red velvet cake",
    Description:
      "Red Velvet Cake, featuring a moist and flavorful blend of cocoa and vanilla. A velvety cream cheese frosting beautifully complements the cake's vibrant crimson hue. Crafted with ingredients like butter and milk, it offers a perfect balance of sweetness.",
    Price: 20.0,
    Categories: "Cake",
    Quantity: 0,
    Image: "https://images.app.goo.gl/zo7oGzoeWr3e2dhn6",
  },
  {
    Name: "Asian fruit cream cake",
    Description:
      "Asian Fruit Cream Cake, a fusion dessert that combines light sponge cake with a medley of fresh Asian fruits and a luscious cream filling. The cake features ingredients such as sponge cake, whipped cream, and an assortment of tropical fruits like lychee, mango, and kiwi. This delicately balanced treat offers a refreshing twist on traditional cakes, creating a delightful harmony of textures and tastes.",
    Price: 25.0,
    Categories: "Cake",
    Quantity: 0,
    Image: "https://images.app.goo.gl/pnDdZoJoyZEZAa9F7",
  },
  {
    Name: " Ice cream cake",
    Description:
      "Ice Cream Cake is a delightful fusion of ice cream and layers of moist cake. This frozen treat offers a perfect balance of textures and flavors, with options like chocolate, vanilla, and various ice cream flavors. Common ingredients include cake layers, ice cream, and a topping like fudge or whipped cream.",
    Price: 30.0,
    Categories: "Cake",
    Quantity: 0,
    Image: "https://images.app.goo.gl/h4hevF8WAJUV1Nf6A",
  },
  {
    Name: "Mooncake",
    Description:
      "Indulge in the exquisite tradition of Mooncakes, a delicacy often enjoyed during the Mid-Autumn Festival. These round pastries boast a rich, dense filling, often made from lotus seed paste or red bean paste, encased in a thin, intricately designed crust. Additional ingredients may include salted duck egg yolks, providing a unique balance of sweet and savory flavors.",
    Price: 20.0,
    Categories: "Cake",
    Quantity: 0,
    Image: "https://images.app.goo.gl/7TgsAp9DcBcB5gfRA",
  },
  {
    Name: "Durian Crepe",
    Description:
      "Durian Crepe combines the rich and distinctive taste of durian fruit with delicate crepes. The crepe's thin layers envelop a luscious filling of durian puree, creating a perfect balance of sweetness and pungency. Ingredients include flour, eggs, milk, sugar, and the star ingredient – durian.",
    Price: 10.0,
    Categories: "Crepe",
    Quantity: 0,
    Image: "https://images.app.goo.gl/vA9fuaHGpmSkq8iY7",
  },
  {
    Name: "Chocolate Swiss Roll",
    Description:
      "Chocolate Swiss Roll, a classic dessert that combines light, fluffy chocolate sponge cake with a velvety chocolate filling. This delectable treat is expertly rolled into a perfect spiral, creating a visually appealing swirl of rich cocoa goodness. Common ingredients include flour, cocoa powder, sugar, eggs, and a decadent chocolate ganache or whipped cream filling. ",
    Price: 11.5,
    Categories: "Swiss Roll",
    Quantity: 50,
    Image: "https://images.app.goo.gl/2m6vhZb8tAVuvNca8",
  },
];

console.log(products);
