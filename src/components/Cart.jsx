// import './Cart.css';

const Cart = ({selected, data}) => (
  <div className="cart">
    {
      selected.length === 0
      ? <h2>The course list is empty</h2>
      : selected.map(course => (
        <div>
            <div>
                {data[course].term} CS {data[course].number}: {data[course].title}
            </div>
            <div>
                {data[course].meets}
            </div>
        </div> 
        ))
    }
  </div>
);

export default Cart;
