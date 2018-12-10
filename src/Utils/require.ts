import callsites from 'callsites';
import { dirname, resolve } from 'path';

const core_src = dirname(resolve(__dirname + "/.."));

const require_from_dir = (name: string, path: string) => {
    try {
        require(require.resolve(name, { paths: [path] }));
    } catch (err) {
        if (err.code === "MODULE_NOT_FOUND") {
            console.log("could not require ", name, "from", path);
            return false;
        }
    }

    return true;
}

const _caller_dir = () => {
    for (const callsite of callsites()) {
        const hasReceiver = callsite.getTypeName() !== null && callsite.getFileName() !== null;
        if (hasReceiver) {
            const filename = callsite.getFileName();
            // ignore ourself
            if (!filename.includes(core_src)) {
                return dirname(filename);
            }
        }
    }
}

export const require_bit = (bit: string) => {
    const origin_dir = _caller_dir();

    if (!(
        require_from_dir(`@surucode/suru-${bit}/register`, origin_dir)
        || require_from_dir(`${bit}/register`, origin_dir)
        || require_from_dir(bit, origin_dir)
    )) {
        throw new Error(`Could not require bit '${bit}' from context: ${origin_dir}`);
    }
}

export const require_pkg = (pkg_name: string) => {
    const origin_dir = _caller_dir();

    if (!(
        require_from_dir(`@surucode/suru-pkg-${pkg_name}`, origin_dir)
        || require_from_dir(`${pkg_name}`, origin_dir)
    )) {
        throw new Error(`Could not require package '${pkg_name}' from context: ${origin_dir}`);
    }
}
