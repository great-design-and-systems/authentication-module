import { GDSDomainDTO } from 'gds-config';

export const NotFound = (field) => {
    return new GDSDomainDTO('NOT_FOUND_ERROR', {
        message: field + ' not found'
    });
}

export const InvalidEmail = () => {
    return new GDSDomainDTO('INVALID_EMAIL', {
        message: 'Ivalid email'
    });
}

export const InvalidUser = () => {
    return new GDSDomainDTO('INVALID_USER', {
        message: 'Ivalid user'
    });
}


export const RegisterResponse = (req, res, err, result) => {
    if (err) {
        res.status(500).send(new GDSDomainDTO('REGISTRATION_FAILED', err.message));
    } else {
        const dto = new GDSDomainDTO('REGISTRATION_COMPLETED', {
            userId: result.userId,
            username: result.username
        });
        dto.addGet('userProfile', 'http://' + req.headers.host + API + 'user-profile/' + result.username);
        res.status(200).send(dto);
    }
}