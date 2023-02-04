import {
    Controller,
    Post,
    UseGuards,
    HttpStatus,
    Body,
    Param,
    Get,
    Put,
    ParseIntPipe,
    Delete,
} from '@nestjs/common';
import { UseRoles, ACGuard } from 'nest-access-control';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RegistrationLinkDto } from './dto/registrationLinkDto';
import { RegistrationLinksService } from './registration-links.service';
import { StudentDto } from '../student/dto/studentDto';
import { RegistrationLinkMakeActiveDto } from './dto/registrationLinkMakeActiveDto';
import { RegistrationLinkForStudentDto } from './dto/registrationLinkForStudentDto';
import { LmsGroupLogoImageUrl } from './dto/lmsGroupLogoDto';
import { RegistrationLink } from '../../../entity/RegistrationLink'

@ApiBearerAuth()
@ApiUseTags('registration links')
@Controller('registration-links')
export class RegistrationLinksController {
    constructor(private registrationLinksService: RegistrationLinksService) {}

    @Get()
    @UseGuards(AuthGuard(), ACGuard)
    @UseRoles({
        action: 'read',
        possession: 'any',
        resource: 'admin-student',
    })
    @ApiOperation({ title: 'Get all registration links' })
    @ApiResponse({
        description: 'The record has been successfully created.',
        status: HttpStatus.OK,
    })
    @ApiResponse({
        description: 'Validation error',
        status: HttpStatus.BAD_REQUEST,
    })
    async getAll() {
        return this.registrationLinksService.getAll();
    }

    @Post()
    @UseGuards(AuthGuard(), ACGuard)
    @UseRoles({
        action: 'create',
        possession: 'any',
        resource: 'registration-links',
    })
    @ApiOperation({ title: 'Create registration link' })
    @ApiResponse({
        description: 'The record has been successfully created.',
        status: HttpStatus.OK,
    })
    @ApiResponse({
        description: 'Validation error',
        status: HttpStatus.BAD_REQUEST,
    })
    async create(@Body() registrationLinkData: RegistrationLinkDto): Promise<RegistrationLink> {
        return this.registrationLinksService.create(registrationLinkData);
    }

    @Post('/:uid/register-student')
    @ApiOperation({ title: 'Register student' })
    @ApiResponse({
        description: 'The record has been successfully created.',
        status: HttpStatus.OK,
    })
    @ApiResponse({
        description: 'Validation error',
        status: HttpStatus.BAD_REQUEST,
    })
    async registerStudent(@Param('uid') uid: string, @Body() studentData: StudentDto): Promise<StudentDto> {
        return this.registrationLinksService.registerStudent(uid, studentData);
    }

    @Get('/:uid')
    @UseRoles({
        action: 'read',
        possession: 'any',
        resource: 'registration-links',
    })
    @ApiOperation({ title: 'Get current registration link' })
    @ApiResponse({
        description: 'The record has been successfully getted.',
        status: HttpStatus.OK,
    })
    @ApiResponse({
        description: 'Validation error',
        status: HttpStatus.BAD_REQUEST,
    })
    async getCurrentRegistrationLink(
        @Param('uid') uid: string,
    ): Promise<RegistrationLinkForStudentDto> {
        return this.registrationLinksService.getCurrentRegLink(uid);
    }

    @Get('/lms-logo/:groupId')
    @UseRoles({
        action: 'read',
        possession: 'any',
        resource: 'registration-links',
    })
    @ApiOperation({ title: 'Get current lms group logo' })
    @ApiResponse({
        description: 'The record has been successfully getted.',
        status: HttpStatus.OK,
    })
    @ApiResponse({
        description: 'Validation error',
        status: HttpStatus.BAD_REQUEST,
    })
    async getCurrentLmsGroupLogo(
        @Param('groupId', new ParseIntPipe()) groupId: number,
    ): Promise<LmsGroupLogoImageUrl> {
        return this.registrationLinksService.getLmsGroupLogoByGroupId(groupId);
    }

    @Put('/:id')
    @UseGuards(AuthGuard(), ACGuard)
    @UseRoles({
        action: 'update',
        possession: 'any',
        resource: 'registration-links',
    })
    @ApiOperation({ title: 'Update active status for registration link' })
    @ApiResponse({
        description: 'The record has been successfully updated.',
        status: HttpStatus.OK,
    })
    @ApiResponse({
        description: 'Validation error',
        status: HttpStatus.BAD_REQUEST,
    })
    async makeActive(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() linkData: RegistrationLinkMakeActiveDto,
    ): Promise<HttpStatus> {
        return this.registrationLinksService.makeActive(id, linkData);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard(), ACGuard)
    @UseRoles({
        action: 'delete',
        possession: 'any',
        resource: 'registration-links',
    })
    @ApiOperation({ title: 'Delete registration link' })
    @ApiResponse({
        description: 'The record has been successfully deleted.',
        status: HttpStatus.OK,
    })
    @ApiResponse({
        description: 'Validation error',
        status: HttpStatus.BAD_REQUEST,
    })
    public async deleteStudentFromCourse(@Param('id', new ParseIntPipe()) id: number): Promise<HttpStatus> {
        return this.registrationLinksService.delete(id);
    }
}
