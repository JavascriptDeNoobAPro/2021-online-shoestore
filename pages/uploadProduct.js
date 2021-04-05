import { Button, Icon } from "@material-ui/core";
import { useState } from "react";

const UploadProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [media, setMedia] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, price, media, description);
  };

  return (
    <>
      <form className='root' onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          name='price'
          placeholder='Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          name='description'
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <img src={media ? URL.createObjectURL(media) : ""} />
        <input
          type='file'
          accept='image/*'
          onChange={(e) => setMedia(e.target.files[0])}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
      </form>
      <style jsx>{`
        .root {
          height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default UploadProduct;
