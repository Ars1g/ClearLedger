"use client";

import { signupSubmitAction } from "@/lib/actions";
import { SignupData, signupSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import GoogleSignInButton from "@/components/GoogleSignUpButton";
import { Input } from "./ui/input";

export default function SignupCard() {
  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignupData) {
    const { error } = await signupSubmitAction(values);

    if (error) {
      form.reset();
      toast.error("Failed to create new account.");
    }

    toast(
      <div>
        <strong>Account successfully created!</strong>
        <p className="font-[400]">Check email for confirmation link</p>
      </div>
    );
    form.reset();
  }

  return (
    <Card className="mt-20 max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>Create new ClearLedger account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">SIGN UP</Button>
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
        <small>Already have an account?</small>
        <Button asChild variant="outline" size="sm">
          <Link href="/login">Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
