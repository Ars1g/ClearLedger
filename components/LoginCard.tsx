"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";

import { LoginData, loginSchema } from "@/lib/schemas";
import { loginAction } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import GoogleSignInButton from "@/components/GoogleSignUpButton";

export default function LoginCard() {
  const router = useRouter();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginData) {
    const { error } = await loginAction(values);

    if (error) {
      form.reset();
      toast.error("Incorrect login or email");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <Card className="mt-20 max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Login to your ClearLedger account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@gmail.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">LOGIN</Button>
          </form>
        </Form>
        <div className="flex gap-3 items-center justify-center">
          <div className="border-t-1 min-w-[39%]"></div>
          <div className="text-gray-500 text-sm">OR</div>
          <div className="border-t-1 min-w-[39%]"></div>
        </div>
        <GoogleSignInButton />
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <small>Don&apos;t have an account?</small>
        <Button asChild variant="outline" size="sm">
          <Link href="/signup">Sign up</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
