"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import PasswordShow from '@/components/Passwordshow';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function UserLoginSection() {
    const router = useRouter();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginClick = async (e) => {
        e.preventDefault();

        const { data, error } = await authClient.signIn.email({
            email: loginData.email,
            password: loginData.password,
        });

        if (data) {
            toast.success("Login Successful!", {
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
            });
            router.push("/");
        }

        if (error) {
            toast.error(error.message || "Invalid Email or Password!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
        }
    };

    const GoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/"
            });
        } catch (error) {
            toast.error("Google Sign-In Failed!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                staggerChildren: 0.05,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 130 }
        }
    };

    return (
        <section className="w-full max-w-md mx-auto px-4 min-h-[calc(100vh-120px)] flex items-center justify-center relative py-10">
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none">
                <div className="absolute top-[-5%] right-[-5%] w-[45%] h-[45%] rounded-full bg-gradient-to-br from-[#237888]/20 to-transparent blur-[100px]" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[45%] h-[45%] rounded-full bg-gradient-to-tr from-teal-100/30 to-transparent blur-[100px]" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-slate-100 dark:border-zinc-800 rounded-2xl p-5 md:p-6 shadow-xl dark:shadow-none space-y-4 relative z-10"
            >
                <div className="text-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#237888] dark:text-teal-400 bg-[#237888]/10 dark:bg-teal-500/10 px-2.5 py-1 rounded-full">
                        Welcome Back
                    </span>
                    <h2 className="text-2xl font-extrabold bg-gradient-to-l from-[#0B253A] to-[#1D9299] bg-clip-text text-transparent dark:text-white tracking-tight mt-3">
                        Account Login
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1.5 text-xs">
                        Enter your credentials to access TutorHub.
                    </p>
                </div>

                <form onSubmit={handleLoginClick} className="space-y-5">
                    <motion.div variants={itemVariants} className="flex flex-col space-y-1.5">
                        <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400">Email Address</label>
                        <div className="relative flex items-center group">
                            <FaEnvelope className="absolute left-4 text-[#237888] dark:text-teal-400 text-sm" />
                            <input
                                type="email"
                                name="email"
                                required
                                value={loginData.email}
                                onChange={handleChange}
                                placeholder="Enter your Email"
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-all"
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col space-y-1">
                        <div className="flex justify-between items-center">
                            <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400">Password</label>
                            <Link
                                href="/forgot-password"
                                className="text-[11px] font-bold text-[#237888] dark:text-teal-400 hover:underline transition-all"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <PasswordShow
                            value={loginData.password}
                            onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-[#237888] hover:bg-[#1a5c69] dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 group"
                        >
                            Login Now
                            <FaSignInAlt className="text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
                        </motion.button>
                    </motion.div>
                </form>

                <motion.div variants={itemVariants}>
                    <p className='text-center font-bold'>OR</p>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={GoogleSignIn}
                        className="w-full py-3 px-4 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2.5 group"
                    >
                        <div className='flex gap-3 justify-center items-center'>
                            <FcGoogle />
                            <span>Login with Google</span>
                        </div>
                    </motion.button>
                </motion.div>

                <motion.p variants={itemVariants} className="text-center text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                    Don't have an account?{' '}
                    <Link
                        href="/signup"
                        className="text-[#237888] dark:text-teal-400 font-bold hover:underline transition-all"
                    >
                        SignUp Now
                    </Link>
                </motion.p>
            </motion.div>
        </section>
    );
}