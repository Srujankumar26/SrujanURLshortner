import React, { useEffect, useState } from "react";
import Service from "../../utils/http";
import {
  Card,
  Avatar,
  Text,
  Group,
  Center,
  Badge,
  Button,
  Stack,
  ActionIcon,
} from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

const obj = new Service();

export default function Profile() {
  const [user, setUser] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  const getProfileData = async () => {
    try {
      let data = await obj.get("user/me");
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, pink, lightblue, lightgreen)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card shadow="xl" padding="lg" radius="xl" withBorder style={{ maxWidth: 350 }}>
        <Center>
          <Avatar
            src={user?.avatar || "https://ui-avatars.com/api/?name=" + user?.name}
            size={100}
            radius={100}
            color="blue"
          />
        </Center>

        <Stack align="center" mt="md" spacing="xs">
          <Text fw={700} size="lg">
            {user?.name || "Unknown User"}
          </Text>

          <Text size="sm" c="dimmed">
            {user?.email || "No email provided"}
          </Text>

          <Group mt="sm" spacing="xs">
            {user?.role && <Badge color="blue">{user.role}</Badge>}
            {user?.status && (
              <Badge color={user.status === "Active" ? "green" : "red"}>
                {user.status}
              </Badge>
            )}
          </Group>
        </Stack>

        <Group grow mt="md">
          <Button variant="light" color="blue">
            Logout  
          </Button>
          <Button variant="filled" color="teal">
            Edit
          </Button>
        </Group>

        {/* Toggle button */}
        <Center mt="md">
          <ActionIcon
            variant="light"
            color="gray"
            radius="xl"
            size="lg"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? <IconEyeOff size={20} /> : <IconEye size={20} />}
          </ActionIcon>
        </Center>

        {/* Hidden details */}
        {showDetails && (
          <Stack mt="md" spacing="xs" align="center">
            <Text size="sm">📍 Location: {user?.location || "LOCAL"}</Text>
            <Text size="sm">📞 Phone: {user?.phone || "+ 91 6381******"}</Text>
            <Text size="sm">ℹ️ Bio: {user?.bio || " friend of jhand fakir ( Nousheen, varsha)"}</Text>
          </Stack>
        )}
      </Card>
    </div>
  );
}
