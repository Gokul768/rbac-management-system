"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboard.service";


interface DashboardStats {
    totalUsers: number;
    totalAdmins: number;
    totalManagers: number;
    totalMembers: number;
}



export default function DashboardPage() {


    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalAdmins: 0,
        totalManagers: 0,
        totalMembers: 0,
    });


    const [loading, setLoading] = useState(true);



    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const data = await getDashboardStats();

                console.log(
                    "DASHBOARD DATA:",
                    data
                );

                setStats(data);


            } catch (error) {

                console.log(
                    "Dashboard Error:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


        fetchDashboard();


    }, []);




    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                Loading Dashboard...

            </div>

        );

    }



    return (

        <div className="min-h-screen p-10">


            <h1 className="text-3xl font-bold mb-8">
                Admin Dashboard
            </h1>



            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">


                <div className="border rounded-lg p-5">

                    <h2 className="font-semibold">
                        Total Users
                    </h2>

                    <p className="text-3xl">
                        {stats.totalUsers}
                    </p>

                </div>




                <div className="border rounded-lg p-5">

                    <h2 className="font-semibold">
                        Total Admins
                    </h2>

                    <p className="text-3xl">
                        {stats.totalAdmins}
                    </p>

                </div>




                <div className="border rounded-lg p-5">

                    <h2 className="font-semibold">
                        Total Managers
                    </h2>

                    <p className="text-3xl">
                        {stats.totalManagers}
                    </p>

                </div>




                <div className="border rounded-lg p-5">

                    <h2 className="font-semibold">
                        Total Members
                    </h2>

                    <p className="text-3xl">
                        {stats.totalMembers}
                    </p>

                </div>



            </div>


        </div>

    );

}