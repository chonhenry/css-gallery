import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@material-ui/core/Container";

export default function NotFound() {
  const router = useRouter();
  const countDown = 5;
  const [second, setSecond] = useState(countDown);

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, countDown * 1000);

    setInterval(() => {
      setSecond((prev) => prev - 1);
    }, 1000);
  }, []);

  return (
    <Container>
      <h1>404</h1>
      <h2>This page cannot be found.</h2>
      <p>
        Redirecting to{" "}
        <Link href="/">
          <a>Homepage</a>
        </Link>{" "}
        in {second}.
      </p>
    </Container>
  );
}
