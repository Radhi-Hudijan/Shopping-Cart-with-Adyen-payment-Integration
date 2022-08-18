import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, Setproducts] = useState([
    {
      _id: "1",
      title: "Nike Shoes 01",
      src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      description: "UI/UX designing, html css tutorials",
      content:
        "Welcome to our shop. we are specializes in selling shoes. From slippers to athletic shoes to boots, the store could also sell shoe accessories, including insoles, shoelaces, shoe horns, shoe polish, etc. In addition, shoe stores may provide clothing and fashion accessories, such as handbags, sunglasses, backpacks, socks, and hosiery.",
      price: 23,
      colors: ["red", "black", "crimson", "teal"],
      count: 1,
    },
    {
      _id: "2",
      title: "Nike Shoes 02",
      src: "https://images.unsplash.com/photo-1654945419086-bcb1c1e1b875?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      description: "UI/UX designing, html css tutorials",
      content:
        "Welcome to our shop. we are specializes in selling shoes. From slippers to athletic shoes to boots, the store could also sell shoe accessories, including insoles, shoelaces, shoe horns, shoe polish, etc. In addition, shoe stores may provide clothing and fashion accessories, such as handbags, sunglasses, backpacks, socks, and hosiery.",
      price: 19,
      colors: ["red", "crimson", "teal"],
      count: 1,
    },
    {
      _id: "3",
      title: "Nike Shoes 03",
      src: "https://images.unsplash.com/photo-1632748914020-941675839f2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=884&q=80",
      description: "UI/UX designing, html css tutorials",
      content:
        "Welcome to our shop. we are specializes in selling shoes. From slippers to athletic shoes to boots, the store could also sell shoe accessories, including insoles, shoelaces, shoe horns, shoe polish, etc. In addition, shoe stores may provide clothing and fashion accessories, such as handbags, sunglasses, backpacks, socks, and hosiery.",
      price: 50,
      colors: ["lightblue", "white", "crimson", "teal"],
      count: 1,
    },
    {
      _id: "4",
      title: "Nike Shoes 04",
      src: "https://images.unsplash.com/photo-1518894781321-630e638d0742?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      description: "UI/UX designing, html css tutorials",
      content:
        "Welcome to our shop. we are specializes in selling shoes. From slippers to athletic shoes to boots, the store could also sell shoe accessories, including insoles, shoelaces, shoe horns, shoe polish, etc. In addition, shoe stores may provide clothing and fashion accessories, such as handbags, sunglasses, backpacks, socks, and hosiery.",
      price: 15,
      colors: ["orange", "black", "crimson", "teal"],
      count: 1,
    },
    {
      _id: "5",
      title: "Nike Shoes 05",
      src: "https://images.unsplash.com/photo-1561808843-7adeb9606939?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      description: "UI/UX designing, html css tutorials",
      content:
        "Welcome to our shop. we are specializes in selling shoes. From slippers to athletic shoes to boots, the store could also sell shoe accessories, including insoles, shoelaces, shoe horns, shoe polish, etc. In addition, shoe stores may provide clothing and fashion accessories, such as handbags, sunglasses, backpacks, socks, and hosiery.",
      price: 10,
      colors: ["orange", "black", "crimson", "teal"],
      count: 1,
    },
    {
      _id: "6",
      title: "Nike Shoes 06",
      src: "https://images.unsplash.com/photo-1499013819532-e4ff41b00669?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      description: "UI/UX designing, html css tutorials",
      content:
        "Welcome to our shop. we are specializes in selling shoes. From slippers to athletic shoes to boots, the store could also sell shoe accessories, including insoles, shoelaces, shoe horns, shoe polish, etc. In addition, shoe stores may provide clothing and fashion accessories, such as handbags, sunglasses, backpacks, socks, and hosiery.",
      price: 17,
      colors: ["orange", "black", "crimson", "teal"],
      count: 1,
    },
  ]);

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addCart = (id) => {
    const check = cart.every((item) => {
      return item._id !== id;
    });
    if (check) {
      const data = products.filter((product) => {
        return product._id === id;
      });
      setCart([...cart, ...data]);
    } else {
      alert("The product has been added to cart.");
    }
  };

  const reduction = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    setCart(cart);
    getTotal();
  };

  const increase = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.count += 1;
      }
    });
    setCart(cart);
    getTotal();
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart(cart);
      getTotal();
    }
  };

  const getTotal = () => {
    const res = cart.reduce((prev, item) => {
      return prev + item.price * item.count;
    }, 0);
    setTotal(res);
  };

  return (
    <DataContext.Provider
      value={{
        products,
        cart,
        total,
        addCart,
        reduction,
        increase,
        getTotal,
        removeProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
