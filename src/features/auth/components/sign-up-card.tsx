"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DottedSeperator } from "@/components/dotted-seperater";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { registerSchema } from "../schemas";
import { useRegister } from "../api/use-register";
import { signUpWithGithub, signUpWithGoogle } from "@/lib/oauth";



export const SignUpCard = () => {
    const { mutate, isPending } = useRegister();
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        mutate({
            json: values,
        });
    }


    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    Sign Up!
                </CardTitle>
                <CardDescription>
                    By signing up, you agree to our {""}
                    <Link href="/privacy">
                        <span className="text-blue-700">Privacy Policy</span>
                    </Link>{" "}
                    and {""}
                    <Link href="/terms">
                        <span className="text-blue-700">Terms of Service</span>
                    </Link>{" "}

                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeperator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Enter email address" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Enter your password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isPending} type="submit" size="lg" className="w-full">
                            Signup
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="p-7">
                <DottedSeperator />
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button
                    onClick={() => signUpWithGoogle()}
                    disabled={isPending}
                    variant={'secondary'}
                    size='lg'
                    className="w-full"
                >
                    <FcGoogle className="size-5 mr-2" />
                    Sign Up With Google
                </Button>
                <Button
                    onClick={() => signUpWithGithub()}
                    disabled={isPending}
                    variant={'secondary'}
                    size='lg'
                    className="w-full"
                >
                    <FaGithub className="size-5 mr-2" />
                    Sign Up With GitHub
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeperator />
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p>
                    Already have an account?{" "}
                    <Link href={'/sign-in'}>
                        <span className="text-blue-700">Sign In</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
};