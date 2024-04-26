import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  useIonToast,
} from '@ionic/react';

const Dashboard: React.FC = () => {
  const [present] = useIonToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const history = useHistory();

  async function createBlog() {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/create-blog", {
        title,
        content,
        category,
        image
      });
  
      if (response.status === 200) {
        console.log(response.data.message);
        present({
          message: "Blog Created Successfully",
          duration: 3000,
          position: "top",
        });
  
        history.push("/details");
      } else {
        throw new Error("Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      present({
        message: "Failed to create blog",
        duration: 3000,
        position: "top",
      });
    }
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonList>
          <IonItem>
            <IonInput
              name="title"
              type="text"
              label="Title"
              labelPlacement='floating'
              placeholder='Enter Title'
              value={title}
              onIonChange={(e: any) => setTitle(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonInput
              name="content"
              type="text"
              label="Content"
              labelPlacement='floating'
              placeholder='Enter Content'
              value={content}
              onIonChange={(e: any) => setContent(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonInput
              name="category"
              type="text"
              label="Category"
              labelPlacement='floating'
              placeholder='Enter Category'
              value={category}
              onIonChange={(e: any) => setCategory(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonInput
              name="image"
              type="text"
              label="Image"
              labelPlacement='floating'
              placeholder='Enter Image URL'
              value={image}
              onIonChange={(e: any) => setImage(e.target.value)}
            />
          </IonItem>
        </IonList>
        <IonButton onClick={createBlog} expand='full'>
          Create Blog
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Dashboard;
