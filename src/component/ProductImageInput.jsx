import { useRef, useState } from "react";
import {
    FaCloudUploadAlt,
    FaImage,
    FaTimes,
    FaSpinner,
} from "react-icons/fa";

const ProductImageInput = ({
    value,
    onChange,
    onPublicIdChange,
}) => {
    const fileInputRef = useRef(null);

    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState("");

    /*
    =====================================================
    CLOUDINARY SETTINGS
    =====================================================
    */

    const cloudName =
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const uploadPreset =
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    /*
    =====================================================
    VALIDATION
    =====================================================
    */

    const validateFile = (file) => {
        if (!file) {
            return "Please select an image.";
        }

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            return "Only JPG, JPEG, PNG and WEBP images are allowed.";
        }

        /*
        Maximum file size: 5MB
        */

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            return "Image must be smaller than 5MB.";
        }

        return "";
    };

    /*
    =====================================================
    UPLOAD TO CLOUDINARY
    =====================================================
    */

    const uploadToCloudinary = async (file) => {
        setError("");

        const validationError = validateFile(file);

        if (validationError) {
            setError(validationError);
            return;
        }

        if (!cloudName) {
            setError(
                "Cloudinary cloud name is missing. Check your .env file."
            );
            return;
        }

        if (!uploadPreset) {
            setError(
                "Cloudinary upload preset is missing. Check your .env file."
            );
            return;
        }

        try {
            setUploading(true);
            setUploadProgress(0);

            const formData = new FormData();

            formData.append("file", file);
            formData.append(
                "upload_preset",
                uploadPreset
            );

            formData.append(
                "folder",
                "emmcore/products"
            );

            const xhr = new XMLHttpRequest();

            /*
            =================================================
            UPLOAD PROGRESS
            =================================================
            */

            xhr.upload.addEventListener(
                "progress",
                (event) => {
                    if (event.lengthComputable) {
                        const progress = Math.round(
                            (event.loaded / event.total) * 100
                        );

                        setUploadProgress(progress);
                    }
                }
            );

            /*
            =================================================
            UPLOAD SUCCESS
            =================================================
            */

            const result = await new Promise(
                (resolve, reject) => {
                    xhr.open(
                        "POST",
                        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
                    );

                    xhr.onload = () => {
                        if (
                            xhr.status >= 200 &&
                            xhr.status < 300
                        ) {
                            try {
                                resolve(
                                    JSON.parse(xhr.responseText)
                                );
                            } catch {
                                reject(
                                    new Error(
                                        "Invalid Cloudinary response."
                                    )
                                );
                            }
                        } else {
                            try {
                                const response =
                                    JSON.parse(
                                        xhr.responseText
                                    );

                                reject(
                                    new Error(
                                        response?.error?.message ||
                                        "Cloudinary upload failed."
                                    )
                                );
                            } catch {
                                reject(
                                    new Error(
                                        "Cloudinary upload failed."
                                    )
                                );
                            }
                        }
                    };

                    xhr.onerror = () => {
                        reject(
                            new Error(
                                "Network error while uploading image."
                            )
                        );
                    };

                    xhr.onabort = () => {
                        reject(
                            new Error(
                                "Image upload was cancelled."
                            )
                        );
                    };

                    xhr.send(formData);
                }
            );

            /*
            =================================================
            SAVE CLOUDINARY URL
            =================================================
            */

            if (!result.secure_url) {
                throw new Error(
                    "Cloudinary did not return an image URL."
                );
            }

            /*
            Send URL to parent.
            */

            onChange(result.secure_url);

            /*
            Send public_id to parent.
            */

            if (onPublicIdChange) {
                onPublicIdChange(
                    result.public_id || ""
                );
            }

            setUploadProgress(100);
        } catch (err) {
            console.error(
                "Cloudinary upload error:",
                err
            );

            setError(
                err.message ||
                "Failed to upload image."
            );
        } finally {
            setUploading(false);
        }
    };

    /*
    =====================================================
    FILE INPUT
    =====================================================
    */

    const handleFileChange = (event) => {
        const file =
            event.target.files?.[0];

        if (file) {
            uploadToCloudinary(file);
        }

        /*
        Allows selecting the same file again.
        */

        event.target.value = "";
    };

    /*
    =====================================================
    DRAG EVENTS
    =====================================================
    */

    const handleDragOver = (event) => {
        event.preventDefault();

        if (!uploading) {
            setDragging(true);
        }
    };

    const handleDragLeave = (event) => {
        event.preventDefault();

        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();

        setDragging(false);

        if (uploading) {
            return;
        }

        const file =
            event.dataTransfer.files?.[0];

        if (file) {
            uploadToCloudinary(file);
        }
    };

    /*
    =====================================================
    REMOVE IMAGE
    =====================================================
    */

    const handleRemove = () => {
        if (uploading) {
            return;
        }

        onChange("");

        if (onPublicIdChange) {
            onPublicIdChange("");
        }

        setError("");
        setUploadProgress(0);
    };

    /*
    =====================================================
    OPEN FILE PICKER
    =====================================================
    */

    const openFilePicker = () => {
        if (!uploading) {
            fileInputRef.current?.click();
        }
    };

    /*
    =====================================================
    RENDER
    =====================================================
    */

    return (
        <div className="w-full">
            {/* ===============================================
          HEADER
      =============================================== */}

            <div className="mb-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FaImage />
                    </div>

                    <div>
                        <h2 className="font-bold text-slate-800">
                            Product Image
                        </h2>

                        <p className="text-xs text-slate-500">
                            Upload a high-quality product image
                        </p>
                    </div>
                </div>
            </div>

            {/* ===============================================
          IMAGE PREVIEW
      =============================================== */}

            {value ? (
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl bg-white">
                        <img
                            src={value}
                            alt="Product preview"
                            className="max-h-[400px] max-w-full object-contain"
                        />

                        {!uploading && (
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="
                  absolute
                  right-4
                  top-4
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  text-white
                  shadow-lg
                  transition
                  hover:scale-105
                  hover:bg-red-600
                "
                                title="Remove image"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>

                    {/* Upload status */}

                    {uploading && (
                        <div className="mt-4">
                            <div className="mb-2 flex items-center justify-between text-sm">
                                <span className="font-semibold text-slate-700">
                                    Uploading image...
                                </span>

                                <span className="font-bold text-blue-600">
                                    {uploadProgress}%
                                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all"
                                    style={{
                                        width: `${uploadProgress}%`,
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {!uploading && (
                        <button
                            type="button"
                            onClick={openFilePicker}
                            className="
                mt-4
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                font-bold
                text-slate-700
                transition
                hover:border-blue-300
                hover:bg-blue-50
                hover:text-blue-600
              "
                        >
                            Change Product Image
                        </button>
                    )}
                </div>
            ) : (
                /* =============================================
                   DROP ZONE
                ============================================= */

                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={openFilePicker}
                    className={`
            relative
            flex
            min-h-[320px]
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-3xl
            border-2
            border-dashed
            p-8
            text-center
            transition-all
            ${dragging
                            ? "border-blue-500 bg-blue-50 scale-[1.01]"
                            : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50"
                        }
          `}
                >
                    {uploading ? (
                        <>
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <FaSpinner className="animate-spin text-2xl" />
                            </div>

                            <h3 className="text-lg font-black text-slate-800">
                                Uploading image...
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Please wait while your image is uploaded.
                            </p>

                            <div className="mt-5 w-full max-w-md">
                                <div className="mb-2 flex justify-between text-xs font-bold">
                                    <span className="text-slate-500">
                                        Upload progress
                                    </span>

                                    <span className="text-blue-600">
                                        {uploadProgress}%
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all"
                                        style={{
                                            width: `${uploadProgress}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className={`
                  mb-5
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  transition
                  ${dragging
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-100 text-blue-600"
                                    }
                `}
                            >
                                <FaCloudUploadAlt className="text-3xl" />
                            </div>

                            <h3 className="text-lg font-black text-slate-800">
                                {dragging
                                    ? "Drop image here"
                                    : "Drag & drop your product image"}
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                or click to browse from your computer
                            </p>

                            <div className="mt-5 flex flex-wrap justify-center gap-2">
                                {[
                                    "JPG",
                                    "JPEG",
                                    "PNG",
                                    "WEBP",
                                ].map((type) => (
                                    <span
                                        key={type}
                                        className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 shadow-sm"
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>

                            <p className="mt-4 text-xs text-slate-400">
                                Maximum file size: 5MB
                            </p>
                        </>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={uploading}
                    />
                </div>
            )}

            {/* ===============================================
          ERROR
      =============================================== */}

            {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    {error}
                </div>
            )}
        </div>
    );
};

export default ProductImageInput;