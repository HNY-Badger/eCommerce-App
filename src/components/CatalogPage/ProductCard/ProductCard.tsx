import React, { KeyboardEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './ProductCard.module.css';
import Button from '../../Button/Button';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { updateCart } from '../../../store/async/CartThunk';

type Props = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  currencyCode: string;
  nonDiscountPrice?: number;
};

function formatPrice(price: number, currencyCode: string): string {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(price);
}

function ProductCard({ id, name, description, image, price, currencyCode, nonDiscountPrice }: Props) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { data: cart } = useAppSelector((state) => state.cartReducer);
  const productInCart = cart?.lineItems.find((item) => item.productId === id);

  const cardClickHandler = () => navigate(`/product/${id}`);
  const keyDownHandler: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') cardClickHandler();
  };

  const buttonClickHandler = () => {
    if (cart !== null) {
      if (productInCart) {
        dispatch(
          updateCart.removeLineItem({
            id: cart.id,
            version: cart.version,
            actionBody: { lineItemId: productInCart.id, quantity: productInCart.quantity },
          })
        );
      } else {
        dispatch(
          updateCart.addLineItem({ id: cart.id, version: cart.version, actionBody: { productId: id, quantity: 1 } })
        );
      }
    }
  };

  return (
    <div className={styles.product_card_wrapper}>
      <div
        className={styles.product_card}
        onClick={cardClickHandler}
        onKeyDown={keyDownHandler}
        role="button"
        tabIndex={0}
      >
        <img className={styles.image} src={image} alt={name} />
        <p className={styles.name}>{name}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.prices}>
          {nonDiscountPrice ? (
            <>
              <p className={styles.discounted_price}>{formatPrice(price, currencyCode)}</p>
              <p className={styles.original_price}>{formatPrice(nonDiscountPrice, currencyCode)}</p>
            </>
          ) : (
            <p className={styles.price}>{formatPrice(price, currencyCode)}</p>
          )}
        </div>
      </div>
      {productInCart ? (
        <Button variant="remove" onClick={buttonClickHandler}>
          Remove from the cart
        </Button>
      ) : (
        <Button onClick={buttonClickHandler}>Add to cart</Button>
      )}
    </div>
  );
}

export default ProductCard;
