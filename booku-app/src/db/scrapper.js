import axios from "axios";
import fs from "fs";

const reformatSpecifications = (specifications) => {
  const reformatted = {
    penerbit: null,
    tanggal_terbit: null,
    halaman: null,
    bahasa: null,
    panjang: null,
    lebar: null,
    berat: null,
  };

  specifications.forEach((spec) => {
    switch (spec.label) {
      case "Penerbit":
        reformatted.penerbit = spec.value;
        break;
      case "Tanggal Terbit":
        reformatted.tanggal_terbit = spec.value;
        break;
      case "Halaman":
        reformatted.halaman = spec.value;
        break;
      case "Bahasa":
        reformatted.bahasa = spec.value;
        break;
      case "Panjang":
        reformatted.panjang = spec.value;
        break;
      case "Lebar":
        reformatted.lebar = spec.value;
        break;
      case "Berat":
        reformatted.berat = spec.value;
        break;
    }
  });

  return [reformatted];
};

async function fetchBooks() {
  try {
    // Fetch books from the first API
    const response = await axios.get(
      "https://api-service.gramedia.com/api/v1/public/featured-category?is_available_only=true&page=1&size=500&type=best-selling-book"
    );
    // console.log(response.data);
    const initialBooks = response.data.data.map((book) => ({
      title: book.title,
      image: book.image,
      slug: book.slug,
      author: book.author,
      final_price: book.final_price,
      slice_price: book.slice_price,
      discount: book.discount,
      isbn: book.isbn,
    }));

    // Fetch additional details for each book
    const detailedBooks = await Promise.all(
      initialBooks.map(async (book, index) => {
        if (index > 0 && index % 100 === 0) {
          console.log(index);
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }

        const variantResponse = await axios.get(
          `https://api-service.gramedia.com/api/v1/public/product-detail-variants/${book.slug}`
        );
        const variantData = variantResponse.data.data[0];
        const reformattedSpecifications = reformatSpecifications(
          variantData.specifications
        )[0];
        // console.log(reformattedSpecifications);

        const descriptionResponse = await axios.get(
          `https://www.gramedia.com/_next/data/Df3w477pYPKpN_C-idXpN/products/${book.slug}.json?productDetailSlug=${book.slug}`
        );
        const description =
          descriptionResponse.data.pageProps.productDetailMeta.description;
        // console.log(description);

        return {
          ...book,
          category: variantData.category.title,
          specifications: [
            {
              deskripsi: description,
              penerbit: reformattedSpecifications.penerbit,
              tanggal_terbit: reformattedSpecifications.tanggal_terbit,
              halaman: reformattedSpecifications.halaman,
              bahasa: reformattedSpecifications.bahasa,
              panjang: reformattedSpecifications.panjang,
              lebar: reformattedSpecifications.lebar,
              berat: reformattedSpecifications.berat,
            },
          ],
        };
      })
    );
    // console.dir(detailedBooks, { depth: null });

    // Save the detailed books data to books.json
    fs.writeFileSync(
      "./src/db/books.json",
      JSON.stringify(detailedBooks, null, 2)
    );
    console.log("Data has been saved to books.json");
  } catch (error) {
    console.error("Error fetching or saving data:", error);
  }
}

fetchBooks();
