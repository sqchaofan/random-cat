import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { Button, Card, Image, Container, Text } from '@mantine/core';
import styles from "./index.module.css";

type Props = {
  initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  // useStateを使って状態を定義
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);

  // ボタンクリック時に画像を読み込む処理
  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  }

  return (
    <Container className={styles.page}>
      <Card shadow="sm" radius="md" padding="lg" withBorder>
        <Card.Section withBorder inheritPadding py="xs">
          <Text fw={500} size="lg">猫画像ジェネレータ</Text>
        </Card.Section>
        <Card.Section>
          <div className={styles.frame}>
            {loading || <Image h={400} w={400} src={imageUrl} />}
          </div>
        </Card.Section>

        <Button fullWidth mt="md" radius="md" onClick={handleClick}>他の猫も見る!</Button>
      </Card>
    </Container>
  );
};
export default IndexPage;

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

type Image = {
  url: string;
};

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  return images[0];
};