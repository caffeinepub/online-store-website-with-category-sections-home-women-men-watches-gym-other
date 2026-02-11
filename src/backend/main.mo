import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  public type Category = {
    #women;
    #men;
    #watches;
    #gym;
    #other;
  };

  public type Product = {
    id : Nat;
    title : Text;
    price : Nat;
    imageLink : Text;
    category : Category;
  };

  let products = [
    // Women
    { id = 1; title = "Women's Winter Jacket"; price = 299; imageLink = "https://c1.wallpaperflare.com/path-to-image.jpg"; category = #women },
    { id = 2; title = "Elegant Dress"; price = 349; imageLink = "https://c1.wallpaperflare.com/path-to-image2.jpg"; category = #women },
    // Men
    { id = 3; title = "Men's Winter Jacket"; price = 299; imageLink = "https://c1.wallpaperflare.com/path-to-image3.jpg"; category = #men },
    // Watches
    { id = 4; title = "Luxury Watch"; price = 799; imageLink = "https://c1.wallpaperflare.com/path-to-image4.jpg"; category = #watches },
    // Gym
    { id = 5; title = "Gym T-Shirt"; price = 49; imageLink = "https://c1.wallpaperflare.com/path-to-image5.jpg"; category = #gym },
    // Other
    { id = 6; title = "High-End Headphones"; price = 499; imageLink = "https://c1.wallpaperflare.com/path-to-image6.jpg"; category = #other },
  ];

  public query ({ caller }) func listAllProducts() : async [Product] {
    products;
  };

  public query ({ caller }) func getProductById(id : Nat) : async Product {
    let filtered = products.filter(func(p) { p.id == id });
    if (filtered.size() == 0) {
      Runtime.trap("Product with ID " # id.toText() # " not found");
    };
    filtered[0];
  };

  public query ({ caller }) func filterProductsByCategory(category : Category) : async [Product] {
    products.filter(func(p) { p.category == category });
  };

  public query ({ caller }) func searchProducts(searchTerm : Text) : async [Product] {
    products.filter(func(p) { p.title.contains(#text searchTerm) });
  };
};
