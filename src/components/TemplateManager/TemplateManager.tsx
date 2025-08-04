import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, ChevronDown, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadWidgets } from "@/redux/widgetsSlice";
import type { RootState } from "@/redux/store";

const TEMPLATE_KEY = "dashboard_templates";

const getTemplates = () => {
  try {
    const raw = localStorage.getItem(TEMPLATE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

const saveTemplate = (name: string, data: any) => {
  const all = getTemplates();
  all[name] = data;
  localStorage.setItem(TEMPLATE_KEY, JSON.stringify(all));
};

const deleteTemplate = (name: string) => {
  const all = getTemplates();
  delete all[name];
  localStorage.setItem(TEMPLATE_KEY, JSON.stringify(all));
};

const TemplateManager = () => {
  const widgets = useSelector((state: RootState) => state.widgets.widgets);
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templates, setTemplates] = useState(getTemplates());

  const handleSave = () => {
    saveTemplate(templateName, widgets);
    setTemplates(getTemplates());
    setOpenDialog(false);
    setTemplateName(""); // reset input
  };

  const handleLoad = (name: string) => {
    const template = templates[name];
    if (template) dispatch(loadWidgets(template));
  };

  const handleDelete = (name: string) => {
    deleteTemplate(name);
    setTemplates(getTemplates());
  };

  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-start gap-2">
            Templates <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          {Object.keys(templates).length ? (
            Object.entries(templates).map(([name]) => (
              <div className="flex justify-between items-center px-2 py-1" key={name}>
                <DropdownMenuItem
                  onClick={() => handleLoad(name)}
                  className="w-full cursor-pointer"
                >
                  {name}
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <p>Delete "{name}" template?</p>
                    <div className="flex justify-end gap-2 mt-4">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(name)}>
                        Delete
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))
          ) : (
            <DropdownMenuItem disabled>No templates saved</DropdownMenuItem>
          )}

          <DropdownMenuItem asChild>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  + Save New Template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Save Template</DialogTitle>
                <Input
                  placeholder="Template Name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={handleSave} disabled={!templateName.trim()}>
                    <Save className="w-4 h-4 mr-2" /> Save
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TemplateManager;
