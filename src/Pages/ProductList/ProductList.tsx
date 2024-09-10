import {
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useParams, useSearchParams } from "react-router-dom";
import LoadingPageList from "../Loading/LoadingPageList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchProducts } from "../../store/product.slice";
import { JSX } from "react/jsx-runtime";
import { Product } from "../../interfaces/product.interface";
import { SortWrapper } from "./styled";

const ProductList = (): JSX.Element => {
  const { items, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  const param = useParams();
  const { category } = param;
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sortBy") || "title";
  const order = searchParams.get("order") || "asc";
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(
          fetchProducts({
            category: category,
            limit: 12,
            sort: sort,
            order: order,
          })
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [dispatch, category, sort, order]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ sortBy: event.target.value, order: order });
  };

  const handleOrderChange = (
    event: React.MouseEvent<HTMLElement>,
    newOrder: string
  ) => {
    if (newOrder !== null) {
      console.log(event);
      setSearchParams({ sortBy: sort, order: newOrder });
    }
  };

  if (isLoading) {
    return <LoadingPageList />;
  }

  return (
    <>
      <SortWrapper>
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="demo-customized-select-native">Sort</InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="title">Title</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </NativeSelect>
        </FormControl>
        <ToggleButtonGroup
          value={order}
          exclusive
          onChange={handleOrderChange}
          aria-label="order"
        >
          <ToggleButton value="asc" aria-label="ascending">
            <ArrowUpwardIcon />
          </ToggleButton>
          <ToggleButton value="desc" aria-label="descending">
            <ArrowDownwardIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </SortWrapper>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {items.map((item: JSX.IntrinsicAttributes & Product) => (
          <Grid item xs={2} sm={4} md={4} key={item.id}>
            <ProductCard {...item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
