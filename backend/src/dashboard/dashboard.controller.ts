import { Controller, Get } from '@nestjs/common';


@Controller('dashboard')
export class DashboardController {


    @Get()
    getDashboardStats() {

        return {
            totalUsers: 1,
            totalAdmins: 1,
            totalManagers: 0,
            totalMembers: 0,
        };

    }

}