import { useEffect, useState } from "react";
import {
  CategoriesList,
  CategoryImage,
  CategoryItem,
  CategoryLink,
  SideBarDiv,
} from "./styled";
import axios from "axios";

interface CategoryType {
  name: string;
  slug: string;
  url: string;
}

const Sidebar = (): JSX.Element => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const sort = "title";
  const order = "asc";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        const data: CategoryType[] = response.data;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SideBarDiv data-testid="sidebar">
      <CategoriesList>
        {categories.map((category) => (
          <CategoryItem key={category.slug}>
            <CategoryLink
              to={`products/${category.slug}?sortBy=${sort}&order=${order}`}
            >
              {category.name}
              <CategoryImage src={`/icon/${category.slug}.svg`} alt="icon" />
            </CategoryLink>
          </CategoryItem>
        ))}
      </CategoriesList>
    </SideBarDiv>
  );
};

export default Sidebar;
