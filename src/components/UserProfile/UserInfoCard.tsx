import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { user } = useAuth();

  const [form, setForm] = useState({
    username: "",
    pass: "",
    nombre: "",
    telefono: "",
    direccion: "",
    ciudad: "",
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        username: user.username || "",
        nombre: user.nombre || "",
        // si tienes más datos, puedes precargarlos también
      }));
    }
  }, [user]);

  const handleSave = () => {
    // Aquí va la lógica para guardar en backend
    console.log("Datos enviados:", form);
    closeModal();
  };

  return (
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Personal Information
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Nombre</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user?.nombre}</p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Usuario</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">@{user?.username}</p>
              </div>
            </div>
          </div>

          <button
              onClick={openModal}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            Editar
          </button>
        </div>

        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Editar Información de Usuario
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Modifica los campos necesarios y guarda los cambios.
              </p>
            </div>
            <form className="flex flex-col">
              <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Username</Label>
                    <Input
                        type="text"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Contraseña</Label>
                    <Input
                        type="password"
                        value={form.pass}
                        onChange={(e) => setForm({ ...form, pass: e.target.value })}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Nombre</Label>
                    <Input
                        type="text"
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Teléfono</Label>
                    <Input
                        type="text"
                        value={form.telefono}
                        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Dirección</Label>
                    <Input
                        type="text"
                        value={form.direccion}
                        onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Ciudad</Label>
                    <Input
                        type="text"
                        value={form.ciudad}
                        onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" variant="outline" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Guardar Cambios
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
  );
}
