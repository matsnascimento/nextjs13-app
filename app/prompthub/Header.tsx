import {
  Avatar,
  Badge,
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spinner,
  Switch,
} from "@nextui-org/react";
import NextLink from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { LuPencilLine } from "react-icons/lu";


export default function Header() {
  const segment = useSelectedLayoutSegment();
  return (
    <>
      <h1 className="font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-pink-500">
        Prompts Premium
      </h1>
      <p className="mt-2 text-sm">
        Explore milhares de prompts selecionados gratuitamente, salve seus favoritos e aumente sua produtividade.
      </p>
      <section
        className="mt-4"
      >
        <Button
          className="float-top justify-end"
          variant="flat"
          color="primary">
          <Link
            color={segment === "(home)" ? undefined : "foreground"}
            href="/prompthub/create-prompt"
            as={NextLink}
          >
            <LuPencilLine className="mr-2" />
            Novo Prompt
          </Link>
        </Button>
      </section>
    </>
  );
}
