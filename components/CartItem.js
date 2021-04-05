import { Button, Modal } from "@material-ui/core";
import accounting from "accounting";
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Image from "next/image";
import Rating from "@material-ui/lab/Rating";

const CartItem = ({
  product: { name, mediaUrl, description, price, rating },
  deleteProduct,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className='cartItem'>
      <div className='image'>
        <Image src={mediaUrl} height={250} width={400} objectFit='contain' />
      </div>
      <div className='info'>
        <h2>{name}</h2>{" "}
        <span>
          {" "}
          <Rating name='read-only' value={rating} readOnly />
        </span>
        <div className='actions'>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<AddCircleOutlineIcon />}
          >
            Add
          </Button>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<DeleteIcon />}
            onClick={handleOpen}
          >
            Delete
          </Button>
        </div>
        <h3>{description}</h3>
      </div>
      <div className='price'>
        <h2>{accounting.formatMoney(price, "€")}</h2>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div className='modal'>
          <h2 id='simple-modal-title'>{name}</h2>
          <p id='simple-modal-description'>
            Sure you want to remove this item from shopping cart ?
          </p>
          <div className='actions'>
            <Button variant='contained' color='secondary'>
              Cancel
            </Button>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<DeleteIcon />}
              onClick={() => deleteProduct()}
            >
              Yes Please
            </Button>
          </div>
        </div>
      </Modal>
      <style jsx>{`
        .cartItem {
          width: 70%;
          display: flex;
          margin: 2rem;
          min-width: 600px;
          border: 2px solid gray;
          padding: 1rem;
          border-radius: 10px;
          box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        }

        .media {
          width: 250px;
        }
        .cartItem .info {
          flex-grow: 1;
          margin-left: 30px;
        }

        .info {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .info h2 {
          margin: 0;
        }

        .actions {
          width: 100%;
          display: flex;
          justify-content: space-evenly;
        }

        .price h2 {
          margin: 0;
        }

        .modal {
          position: absolute;
          top: 20vh;
          right: 20vh;
          width: 300;
          background-color: #fff;
          border: 2px solid #000;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default CartItem;
