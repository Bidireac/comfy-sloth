import React, { useEffect } from 'react';
import styled from 'styled-components';
import Error from './Error';
import Loading from './Loading';
import Product from './Product';
import { useSelector, useDispatch } from 'react-redux';
import { getFeaturedProducts } from '../redux/productsSlice';

const FeaturedProducts = () => {
  const featured = useSelector((state) => state.products.featured_products);
  const pending = useSelector((state) => state.products.pending);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeaturedProducts());
  }, [dispatch]);

  if (pending) return <Loading />;
  if (error) return <Error />;

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {featured.slice(0, 3).map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
