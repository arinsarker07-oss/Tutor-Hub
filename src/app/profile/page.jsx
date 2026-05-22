"use client";
import { authClient } from "@/lib/auth-client";
import {
    Avatar,
    Button,
    Card,
    CardFooter,
    CardHeader,
    Chip,
    Skeleton,
    Input, Label, Modal, Surface, TextField,
    FieldError
} from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FiEdit3 } from "react-icons/fi";
import {
    HiOutlineBadgeCheck,
    HiOutlineCalendar,
    HiOutlineExclamationCircle,
    HiOutlineMail,
} from "react-icons/hi";
import { GrUpdate } from "react-icons/gr";


const ProfilePage = () => {
    const OnSubmit = async(e) => {
        e.preventDefault()
        const name = e.target.name.value
        const image = e.target.image.value

        await authClient.updateUser({
           name,image
        })
    }


    const { data, isPending } = authClient.useSession();
    const user = data?.user;

    if (isPending) {
        return (
            <div className="flex justify-center items-center min-h-screen p-4">
                <Card className="w-full max-w-[400px] p-4 space-y-5">
                    <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                </Card>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#f4f7fb] font-sans text-center px-4">
                <div className="max-w-md p-8 bg-white rounded-3xl shadow-xl">
                    <h1 className="text-4xl font-black text-slate-800 mb-4">Oops!</h1>
                    <p className="text-slate-500 mb-6 font-medium text-lg">Please login to access your profile dashboard.</p>
                    <Link href="/login">
                        <Button color="primary" variant="shadow" size="lg" className="font-bold border text-white border-gray-500 hover:bg-[#237888] px-8">Login Now</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen  p-4 font-sans">
            <Card className="max-w-[400px] w-full shadow-xl border-none ">
                <CardHeader className="flex flex-col gap-3 items-center pb-0 pt-8">

                    <div className={`p-0.5 rounded-full border-5 ${user?.emailVerified ? 'border-success' : 'border-[#237888]'}`}>
                        <Avatar className="w-24 h-24 text-large rounded-full">
                            <Avatar.Image alt={user?.name[0]} src={user?.image} referrerPolicy='no-referrer' />
                            <Avatar.Fallback className="text-4xl">{user?.name[0]}</Avatar.Fallback>
                        </Avatar>
                    </div>
                    <div className="flex flex-col items-center">
                        <h4 className="text-2xl font-bold text-default-800 capitalize">
                            {user?.name}
                        </h4>
                        <p className="text-small text-default-500">
                            ID: {user?.id?.slice(0, 8)}...
                        </p>
                    </div>
                </CardHeader>

                <div className="px-6 py-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <HiOutlineMail size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-tiny text-default-400">Email Address</span>
                            <span className="text-small font-medium">{user?.email}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${user?.emailVerified ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {user?.emailVerified ? <HiOutlineBadgeCheck size={20} /> : <HiOutlineExclamationCircle size={20} />}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-tiny text-default-400">Status</span>
                            <Chip
                                size="sm"
                                variant="flat"
                                color={user?.emailVerified ? "success" : "danger"}
                            >
                                {user?.emailVerified ? "Verified" : "Unverified"}
                            </Chip>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                            <HiOutlineCalendar size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-tiny text-default-400">Joined On</span>
                            <span className="text-small font-medium">
                                {user?.createdAt ? new Date(user.createdAt).toDateString() : "N/A"}
                            </span>
                        </div>
                    </div>
                </div>

                <CardFooter className="pt-0 pb-8 px-6">

                    <Modal>
                        <Button
                            className="w-full bg-gray-900 text-white shadow-lg font-semibold h-12"
                            radius="lg"
                            endContent={<FiEdit3 />} >
                            Update Profile
                        </Button>
                        <Modal.Backdrop>
                            <Modal.Container placement="auto">
                                <Modal.Dialog className="sm:max-w-md">
                                    <Modal.CloseTrigger />
                                    <Modal.Header>
                                        <Modal.Heading className="text-xl font-black">To update your profile </Modal.Heading>
                                        <p className="mt-1.5 text-sm leading-5 text-muted flex text-violet-800 ">
                                            provide : your name and your photo url
                                        </p>
                                    </Modal.Header>
                                    <Modal.Body className="p-6">
                                        <Surface variant="default">
                                            <form onSubmit={OnSubmit} className="flex flex-col gap-4">
                                                <TextField isRequired className="w-full" name="name" type="text">
                                                    <Label>Name</Label>
                                                    <Input placeholder="Enter your name" />
                                                    <FieldError />
                                                </TextField>
                                                <TextField isRequired name="image" type="url">
                                                    <Label>Image URL</Label>
                                                    <Input placeholder="Image URL" />
                                                    <FieldError />
                                                </TextField>
                                                <Modal.Footer>
                                                    <Button slot="close" variant="secondary">
                                                        Cancel
                                                    </Button>
                                                    <Button type="submit" slot="close"><GrUpdate /> update</Button>
                                                </Modal.Footer>
                                            </form>
                                        </Surface>
                                    </Modal.Body>
                                </Modal.Dialog>
                            </Modal.Container>
                        </Modal.Backdrop>
                    </Modal>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProfilePage;